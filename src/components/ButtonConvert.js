import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import moment from 'moment'
import { generateId, populateXML, rowToObject } from 'utils'
import * as xml from 'xml'

export function ButtonConvert({inputFile}) {

	const [isConverting, setConverting] = useState(false)
	const [isConverted, setConverted] = useState(false)
	const [blob, setBlob] = useState(null)

	const zip = new JSZip()

	// Reset convert button every time a file is added/removed/replaced
	useEffect(() => {
		setConverting(false)
		setConverted(false)
	}, [inputFile])

	// Converts the .xlsx file into QTI
	function convert() {
		setConverting(true)

		const wb = new Excel.Workbook()
		// HTML FileReader
		const reader = new FileReader()
		reader.readAsArrayBuffer(inputFile)
		reader.onload = async () => {
			// Get workbook
			const buffer = reader.result
			const workbook = await wb.xlsx.load(buffer)

			// Get the first worksheet in the workbook
			const worksheet = workbook.worksheets[0]
			
			// Generate question XML based on question type
			const headerRowNumber = 2
			let promises = []
			worksheet.eachRow((row) => {
				if (row.number <= headerRowNumber) return
				const rowData = rowToObject(worksheet.getRow(headerRowNumber), row)
				if (rowData['Question'] !== null) {
					if (rowData['Type'] === 'MCQ') {
						promises.push(mcq(rowData))
					}
				}
			})
			const questionXMLs = await Promise.all(promises.map(async promise => await promise))
			const questionsXML = questionXMLs.join('\n')

			// Generate quiz XML
			const quizId = generateId(32)
			const title = inputFile.name.split('.')[0]
			const quizXML = await populateXML(xml.quiz, {
				questions: questionsXML,
				quizId,
				title
			})

			// Generate manifests
			const assessmentMetaXML = await populateXML(xml.assessment_meta, {
				assignmentGroupId: generateId(32),
				assignmentId: generateId(32),
				pointsPossible: questionXMLs.length,
				quizId,
				title,
			})
			const imsmanifestXML = await populateXML(xml.imsmanifest, {
				manifestId: generateId(32),
				quizId,
				resourceId: generateId(32),
				ymd: moment().format('YYYY-MM-DD'),
			})

			// zip everything and prepare for download
			zip.file('imsmanifest.xml', imsmanifestXML)
			zip.folder('non_cc_assessments')
			zip.file(`g${quizId}/assessment_meta.xml`, assessmentMetaXML)
			zip.file(`g${quizId}/g${quizId}.xml`, quizXML)
			setBlob(await zip.generateAsync({type:'blob'}))

			// Finish up
			setConverting(false)
			setConverted(true)
		}
	}

	async function mcq(rowData) {
		const correctAnswerId = generateId(5)
		let answerIds = []
		const answerXMLs = await Promise.all(
			Object.entries(rowData).filter(([k,v]) => k.includes('answer')).map(async ([k,v]) => {
				let answerId
				if (k === 'Correct answer') {
					answerId = correctAnswerId
				}
				else if (v === null) {
					return ''
				}
				else {
					answerId = generateId(5)
				}
				answerIds.push(answerId)
				return await populateXML(xml.answer, {
					answer: v,
					answerId 
				})
			}))

		const questionXML = await populateXML(xml.mcq, {
			answerIds,
			answers: answerXMLs.join('\n'),
			category: rowData['Specific category'],
			correctAnswerId,
			explanation: rowData['Explanation'],
			itemId: generateId(32),
			phrase: rowData['Phrase (with English glosses)'],
			question: rowData['Question'],
			questionId: generateId(32),
			reference: rowData['Reference'],
			word: rowData['Word']
		})
		return questionXML
	}

	async function download() {
		const title = inputFile.name.split('.')[0]
		saveAs(blob, `${title}.zip`)
	}

	return (
		<Button disabled={inputFile === null || isConverting} loading={isConverting} onClick={isConverted ? download : convert} primary>
			<Icon name={isConverted ? 'download' : 'random'} /> {isConverted ? 'Download QTI' : 'Convert'}
		</Button>
	)
}