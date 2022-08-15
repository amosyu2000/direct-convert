import { generateId, populate } from 'utils'
import * as xml from 'xml'

export async function tblQuestionEngine(questionTemplate, rowData, allRowsData) {
	// Get all rows that are part of the same category
	const categoryRows = allRowsData.filter(row => row.Category === rowData.Category)
	// We only want to generate one table per category
	if (rowData.Word !== categoryRows[0].Word) return ''

	// Generate the question
	let question = await populate(questionTemplate.title
		.split('\n')
		// Using a null character because we want the populate function to escape the HTML string
		// Otherwise the populate function will mistake the string for XML
		.map(p => `\0<p>${p}</p>`)
		.join('<p>&nbsp;</p>'),
		rowData)

	// Highlight words
	for (const { Word } of categoryRows) {
		question = question.replace(Word, `<span style="background-color: #ffcc99;">${Word}</span>`)
	}

	const questionXML = populate(xml.table_question, {
		answerIds: '',
		Category: rowData.Category,
		Feedback: '',
		itemId: generateId(32),
		question,
		questionId: generateId(32),
		tableRows: '',
		respconditions: '',
		response_lids: '',
	})

	return questionXML
}