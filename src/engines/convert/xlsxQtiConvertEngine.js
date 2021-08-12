import Excel from 'exceljs'
import JSZip from 'jszip'
import moment from 'moment'
import { CONFIG } from 'admin'
import { generateId, populate, xlsxRowToObject } from 'utils'
import * as xml from 'xml'

export function xlsxQtiConvertEngine(inFile, callback) {
	// HTML FileReader
	const reader = new FileReader()
	reader.onload = async () => {
		// Load workbook from buffer
		const wb = new Excel.Workbook()
		const buffer = reader.result
		const workbook = await wb.xlsx.load(buffer)
		
		let promises = []

		// Generate questions from each worksheet based on question type
		workbook.eachSheet(worksheet => {
			// Generate question XML
			const headerRowNumber = 2
			const { name } = worksheet
			worksheet.eachRow((row) => {
				if (row.number <= headerRowNumber) return
				const rowData = xlsxRowToObject(worksheet.getRow(headerRowNumber), row)

				// Use the workbook name to find the corresponding question engine for this question type
				let matchingTemplate = null
				const matchingQuestion = CONFIG.xlsx.qti.questions.find(
					question => question.templates.some(
					template => {
						if (template.name === name) {
							matchingTemplate = template
							return true
						}
						return false
					}))
				const engine = matchingQuestion.questionEngine
				promises.push(engine(matchingTemplate.question, rowData))
			})
		})
		
		// Fulfill all the promises
		const questionXMLs = await Promise.all(promises.map(async promise => await promise))
		const questionsXML = questionXMLs.join('\n')
		
		// Generate quiz XML
		const quizId = generateId(32)
		const title = inFile.name.split('.')[0]
		const quizXML = await populate(xml.quiz, {
			questions: questionsXML,
			quizId,
			title
		})
		
		// Generate manifests
		const assessmentMetaXML = await populate(xml.assessment_meta, {
			assignmentGroupId: generateId(32),
			assignmentId: generateId(32),
			pointsPossible: questionXMLs.length,
			quizId,
			title,
		})
		const imsmanifestXML = await populate(xml.imsmanifest, {
			manifestId: generateId(32),
			quizId,
			resourceId: generateId(32),
			ymd: moment().format('YYYY-MM-DD'),
		})
		
		// zip everything and prepare for download
		const zip = new JSZip()
		zip.file('imsmanifest.xml', imsmanifestXML)
		zip.folder('non_cc_assessments')
		zip.file(`g${quizId}/assessment_meta.xml`, assessmentMetaXML)
		zip.file(`g${quizId}/g${quizId}.xml`, quizXML)
		callback(await zip.generateAsync({type:'blob'}))
	}
	reader.readAsArrayBuffer(inFile)
}