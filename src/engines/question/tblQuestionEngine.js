import { generateId, populate, splitCSString } from 'utils'
import * as xml from 'xml'

export async function tblQuestionEngine(questionTemplate, rowData, allRowsData) {
	// Get all rows that are part of the same category
	const categoryRows = allRowsData.filter(row => row.Category === rowData.Category)
	// We only want to generate one table per category
	if (rowData.Word !== categoryRows[0].Word) return null

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

	const trsArray = [], answerIds = [], responseLidXMLs = [], respconditionXMLs = [], feedbackArray = []
	trsArray.push([ 'Word', ...questionTemplate.columns ].map(header => `<strong>${header}</strong>`))

	for (const row of categoryRows) {

		const tdArray = []
		const feedbackRow = []
		for (const header of questionTemplate.columns) {
			const placeholder = generateId(10)
			// Add table cell
			tdArray.push(placeholder)

			const correctResponses = splitCSString(row[`${header} (Correct choices)`])
			// The first response_label in each response_lid should contain the placeholder
			const firstAnswerId = generateId(5)
			answerIds.push(firstAnswerId)
			const responseLabelXMLs = [await populate(xml.response_label, {
				answerId: firstAnswerId,
				answer: placeholder
			})]
			// Generate all other response_labels which contain the possible correct answers for each fitb
			await Promise.all(correctResponses.map(async answer => {
				const answerId = generateId(5)
				answerIds.push(answerId)
				return responseLabelXMLs.push(await populate(xml.response_label, { answerId, answer }))
			}))
			// Put all response_labels into a response_lid (each fitb corresponds to one response_lid)
			responseLidXMLs.push(await populate(xml.response_lid, {
				name: placeholder,
				response_labels: responseLabelXMLs.join('\n'),
			}))
			respconditionXMLs.push(await populate(xml.respcondition, {
				name: placeholder,
				answerId: firstAnswerId,
				score: 100/(questionTemplate.columns.length * categoryRows.length)
			}))

			const feedbackCell = row[`${header} (Feedback)`]
			if (feedbackCell !== null) {
				feedbackRow.push(feedbackCell)
			}
		}

		// Add row of cells to table
		trsArray.push([row.Word, ...tdArray.map(td => `\`${td}\``)])
		feedbackArray.push(`${row.Word} - ${feedbackRow.join(', ')}`)
	}

	// Convert td array of string arrays to HTML string
	const trs = '\0' + trsArray.map(tr => `<tr style="height: 29px;">${tr.map(td => `<td style="height: 29px;">${td}</td>`).join('')}</tr>`).join('')
	// Convert feedback string array to HTML string
	const Feedback = '\0' + feedbackArray.map(p => `<p>${p}</p>`).join('')

	const questionXML = await populate(xml.table_question, {
		answerIds,
		Category: rowData.Category,
		Feedback,
		itemId: generateId(32),
		question,
		questionId: generateId(32),
		trs,
		respconditions: respconditionXMLs.join('\n'),
		response_lids: responseLidXMLs.join('\n'),
	})

	return questionXML
}
