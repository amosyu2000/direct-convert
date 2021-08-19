// Engine for generating the worksheet template for a multiple dropdown question
export function mdqWorksheetEngine(workbook, template) {
	const { name, question } = template
	const questionParameters = question.match(/{([^{}]+)}/g).map(param => param.substring(1, param.length-1))
	const dropdownParameters = question.match(/\[([^[\]]+)\]/g).map(param => param.substring(1, param.length-1))
	const worksheet = workbook.addWorksheet(name)
	worksheet.columns = [
		{ header: 'Category' },
		...questionParameters.map(p => ({ header: p })),
		...dropdownParameters.map(p => ({ header: p })),
		...dropdownParameters.map(p => ({ header: `${p} options` })),
	]
}