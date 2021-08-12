import { generateId, populate, shuffleArray } from 'utils'
import * as xml from 'xml'

export async function mcqQuestionEngine(questionTemplate, rowData) {
	// Generate the question
	const question = await populate(questionTemplate, rowData)

	// Generate the answer options
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
			return await populate(xml.response_label, {
				answer: v,
				answerId 
			})
		}))
	shuffleArray(answerXMLs)

	const questionXML = await populate(xml.multiple_choice_question, {
		answerIds,
		answers: answerXMLs.join('\n'),
		correctAnswerId,
		itemId: generateId(32),
		question,
		questionId: generateId(32),
		...rowData
	})
	return questionXML
}