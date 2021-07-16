import axios from 'axios'

export function generateId(length) {
	const bank = '0123456789abcdef'
	let output = ''
	for (let i = 0; i < length; i++) {
		output += bank.charAt(Math.floor(Math.random() * bank.length))
	}
	return output;
}

// https://stackoverflow.com/a/18650828/12191708
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function populateXML(filepath, json) {
	const file = await axios(filepath)
	let text = file.data
	Object.entries(json).forEach(([k,v]) => {
		const re = new RegExp(`{${k}}`, 'g')
		text = text.replace(re, v)
	})
	return text
}

export function rowToObject(headerRow, row) {
	const json = {}
	headerRow.eachCell((cell) => {
		json[cell.value] = row.getCell(cell.col).value
	})
	return json
}