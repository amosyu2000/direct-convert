import { generateId, populate } from 'utils'
import * as xml from 'xml'

export async function saqQuestionEngine(questionTemplate, rowData) {
	// Generate the question
	const question = await populate(questionTemplate, rowData)

	// All possible correct answers are to be converted into XML
	const answerData = Object.entries(rowData).filter(([k,_]) => k.includes('Correct answer')).map(([k,v]) => v)
	let answerXMLs = [], answerIds = []
	await Promise.all(answerData.map(async (answer) => {
		if (!answer) return
		// Answer Ids are not used anywhere else for some reason
		answerIds.push(generateId(5))
		answerXMLs.push(await populate(xml.varequal, { answerId: answer }))
	}))
	const answers = answerXMLs.join('')

	const questionXML = await populate(xml.short_answer_question, {
		answerIds,
		answers,
		Category: rowData.Category,
		itemId: generateId(32),
		question,
		questionId: generateId(32),
	})
	return questionXML
}