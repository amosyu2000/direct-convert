// Engine for generating the worksheet template for a short answer question
export function saqWorksheetEngine(workbook, template) {
	const { name, question } = template
	const questionParameters = question.match(/{([^{}]+)}/g).map(param => param.substring(1, param.length-1))
	const worksheet = workbook.addWorksheet(name)
	worksheet.columns = [
		{ header: 'Category' },
		...questionParameters.map(p => ({ header: p })),
		{ header: 'Correct answer' },
		{ header: 'Correct answer' },
		{ header: 'Correct answer' },
	]
}