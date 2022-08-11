// Engine for generating the worksheet template for a table question
export function tblWorksheetEngine(workbook, template) {
	const { name, question, columns } = template
	const questionParameters = question.match(/{([^{}]+)}/g) || []
	const worksheet = workbook.addWorksheet(name)
	worksheet.columns = [
		{ header: 'Category' },
        { header: 'Word' },
		...questionParameters.map(param => ({ header: param.substring(1, param.length-1) })),
		...columns.map(p => ({ header: `${p} (Feedback)` })),
        ...columns.map(p => ({ header: `${p} (Correct choices)` }))
	]
}