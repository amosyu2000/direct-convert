import { generateId, populate, shuffleArray } from 'utils'
import * as xml from 'xml'

export async function maqQuestionEngine(questionTemplate, rowData) {
	// Generate the question
	const question = await populate(questionTemplate, rowData)

	// Generate the answer options
	let answerIds = []
	let answerXMLs = []
	let pointsPossible = 0
	let responseXMLs = []

	const answerData = Object.entries(rowData).filter(([k,_]) => k.includes('answer'))
	await Promise.all(answerData.map(async ([k,v]) => {
		let answerId = generateId(5)
		
		// Add response XML to array based on whether the answer is Correct or Incorrect
		if (k.includes('Correct answer')) {
			responseXMLs.push(await populate(xml.varequal, { answerId }))
			pointsPossible++
		}
		else if (k.includes('Incorrect answer')) {
			responseXMLs.push(`<not>${await populate(xml.varequal, { answerId })}</not>`)
		}
		else {
			return
		}

		// Add answer id to array
		answerIds.push(answerId)
		// Add answer XML to array
		answerXMLs.push(await populate(xml.response_label, {
			answer: v,
			answerId 
		}))
	}))
	shuffleArray(answerXMLs)
	const answers = answerXMLs.join('\n')
	const responses = responseXMLs.join('\n')

	const questionXML = await populate(xml.multiple_answers_question, {
		answerIds,
		answers,
		Category: rowData.Category,
		itemId: generateId(32),
		pointsPossible,
		question,
		questionId: generateId(32),
		responses
	})
	return questionXML
}