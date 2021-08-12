// Engine for generating the worksheet template of a multiple answer question
export function maqWorksheetEngine(workbook, template) {
	const { name, question } = template
	const questionParameters = question.match(/{([^{}]+)}/g).map(param => param.substring(1, param.length-1))
	const worksheet = workbook.addWorksheet(name)
	worksheet.columns = [
		{ header: 'Category' },
		...questionParameters.map(p => ({ header: p })),
		{ header: 'Correct answer' },
		{ header: 'Correct answer' },
		{ header: 'Correct answer' },
		{ header: 'Incorrect answer' },
		{ header: 'Incorrect answer' },
		{ header: 'Incorrect answer' }
	]
}