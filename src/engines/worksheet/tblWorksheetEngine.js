// Engine for generating the worksheet template for a table question
export function tblWorksheetEngine(workbook, template) {
	const { name, question } = template
	const questionParameters = question.title.match(/{([^{}]+)}/g) || []
	const worksheet = workbook.addWorksheet(name)
	worksheet.columns = [
		{ header: 'Category' },
		{ header: 'Word' },
		...questionParameters.map(param => ({ header: param.substring(1, param.length-1) })),
		...question.columns.map(p => ({ header: `${p} (Feedback)` })),
		...question.columns.map(p => ({ header: `${p} (Correct choices)` }))
	]
}