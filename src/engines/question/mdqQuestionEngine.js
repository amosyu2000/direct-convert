import { generateId, populate, splitCSString } from 'utils'
import * as xml from 'xml'

export async function mdqQuestionEngine(questionTemplate, rowData) {

	function toAlphaNumeric(str) {
		const re = new RegExp('[^a-zA-Z0-9]', 'g')
		return str.replace(re, '')
	}

	// For multiple dropdown questions, there is additional functionality in the question itself
	let question = await populate(questionTemplate, rowData)
	const allDropdowns = question.match(/\[([^[\]]+)\]/g).map(param => param.substring(1, param.length-1))
	
	// As a cautionary measure, do not generate the dropdown if the correct answer is not found in list of possible answers or if the list of possible answers is empty
	const dropdowns = allDropdowns.filter(name => {
		const correctResponse = rowData[name]
		const possibleResponses = splitCSString(rowData[`${name} options`])
		const re = new RegExp(`${name}: \\[${name}]\\. `, 'g')
		if (possibleResponses.includes(correctResponse)) {
			// Strip the name down to alphanumeric characters so the XML doesn't misbehave
			const alphaName = toAlphaNumeric(name)
			question = question.replace(re, `${name}: [${alphaName}]. `)
			return true
		}
		else {
			// Remove the string entirely
			question = question.replace(re, '')
			return false
		}
	})
	
	// Generate XMLs for the answers and responses
	let answerIds = [], respconditionXMLs = [], responseLabelXMLs = []
	await Promise.all(dropdowns.map(async (name) => {
		const correctResponse = rowData[name]
		const possibleResponses = splitCSString(rowData[`${name} options`])
		const correctAnswerId = generateId(5)
		const responseLabels = await Promise.all(possibleResponses.map(async (answer) => {
			const answerId = answer === correctResponse ? correctAnswerId : generateId(5)
			return await populate(xml.response_label, { answerId, answer })
		}))
		responseLabelXMLs.push(await populate(xml.response_lid, { 
			name: toAlphaNumeric(name), 
			response_labels: responseLabels 
		}))
		respconditionXMLs.push(await populate(xml.respcondition, { 
			answerId: correctAnswerId, 
			name: toAlphaNumeric(name), 
			score: 100/dropdowns.length 
		}))
	}))
	
	const respconditions = respconditionXMLs.join('')
	const response_lids = responseLabelXMLs.join('')

	const questionXML = await populate(xml.multiple_dropdowns_question, {
		answerIds,
		Category: rowData.Category,
		itemId: generateId(32),
		question,
		questionId: generateId(32),
		respconditions,
		response_lids
	})
	return questionXML
}