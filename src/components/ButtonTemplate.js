import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Button, Dropdown } from 'semantic-ui-react'
import { CONFIG } from 'admin'
import { DropdownHeaderFragment } from 'components'

// Provides the user with a downloadable template to fill out
export function ButtonTemplate() { 

	const { inType, outType } = useParams()
	const [ selections, setSelections ] = useState([])
	const [downloadDisabled, setDownloadDisabled] = useState(true)
	// Enable the download button if the user has made at least one selection
	useEffect(() => {
		if (selections.length > 0) {
			setDownloadDisabled(false)
		}
		else {
			setDownloadDisabled(true)
		}
	}, [selections])

	// Object of question types from the config
	const questions = CONFIG[inType][outType].questions

	// Each template of each question type is used as an option in the dropdown menu
	const options = []
	questions.forEach(question => {
		options.push({
			key: options.length,
			text: question.name,
			value: null,
			as: DropdownHeaderFragment
		})
		question.templates.forEach(template => {
			options.push({
				key: options.length,
				text: template.name,
				value: JSON.stringify(template),
				icon: '', // Indent
			})
		})
	})

	// Handler for downloading the template
	function download() {
		const wb = new ExcelJS.Workbook()

		addWorksheets(wb)

		// Initiate a client-side download of the .xlsx file
		// https://github.com/exceljs/exceljs/issues/354#issuecomment-325764873
		wb.xlsx.writeBuffer().then(
			function(data) {
				const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
				saveAs(blob, 'Template')
			}
		)
	}

	function addWorksheets(workbook) {
		// Use worksheet engines to generate a template for each of the selected question types
		selections.forEach(pselection => {
			const selection = JSON.parse(pselection)
			// Find the corresponding engine to the template
			const matchingQuestion = questions.find(question => question.templates.some(template => template.name === selection.name))
			const engine = matchingQuestion.worksheetEngine

			// Use the engine to generate a worksheet for that template and question type
			engine(workbook, selection)
		})
		
		// Add the reminder header to each worksheet
		workbook.eachSheet(worksheet => {
			let lastCol = null
			worksheet.columns.forEach(column => {
				// Adjust column width to match header
				column.width = column.header.length + 3
				
				// Shift header down by one row
				column.header = [null, column.header]
				lastCol = column.letter
			})

			// Merge all the cells in the first row
			worksheet.mergeCells('A1', `${lastCol}1`)

			// Add reminder to first row
			const firstCell = worksheet.getCell('A1')
			firstCell.value = 'NOTE: Remember to rename this .xlsx file as the title of the quiz.'
			firstCell.font = {
				bold: true,
				italic: true
			}
			firstCell.fill = {
				type: 'pattern',
				pattern:'solid',
				fgColor: { argb:'FFFFD966' }
			}
			firstCell.alignment = { 
				vertical: 'middle',
				horizontal: 'center'
			}
			
			// Bold the row of headers
			const secondRow = worksheet.getRow(2)
			secondRow.font = {
				bold: true
			}
			secondRow.alignment = { 
				vertical: 'middle',
				horizontal: 'center'
			}
		})
	}

	return (
		<Container fluid>
			<Dropdown 
				className="mb-2"
				fluid
				multiple
				onChange={(_,e) => {setSelections(e.value)}}
				options={options}
				placeholder="Select Question Types"
				selection
			/>
			<Button 
				content="Download Template"
				disabled={downloadDisabled}
				icon="download" 
				onClick={download}
				primary 
			/>
		</Container>
	)
}