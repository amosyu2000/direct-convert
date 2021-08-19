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
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export async function populate(inputString, json) {
	const encodings = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\n': '&lt;br&gt;'
	}
	let text = null
	// inputString could be a filepath or the string itself
	if (inputString.startsWith('/static')) {
		const file = await axios(inputString)
		text = file.data
	}
	else {
		text = inputString
	}
	Object.entries(json).forEach(([k,v]) => {
		let cleanValue = ''
		// If the value is undefined or null, we just want it to print an empty string
		if (v !== undefined && v !== null) {
			cleanValue = v.toString()
		}
		// Encode special characters if the value is not already an XML
		const reXML = new RegExp(/^<(\w+)(\s+[\s\S]*)?>[\s\S]*<\/(\w+)>$/)
		if (!reXML.test(cleanValue.trim())) {
			Object.entries(encodings).forEach(([l,w]) => {
				const re = new RegExp(l, 'g')
				cleanValue = cleanValue.replace(re, w)
			})
		}
		// Escape special characters in the key (we want the literals only)
		const cleanKey = k.replace(/[-&/\\^$*+?.()|[\]{}]/g, '\\$&')
		const re = new RegExp(`{${cleanKey}}`, 'g')
		text = text.replace(re, cleanValue)
	})
	return text
}

export function xlsxRowToObject(headerRow, row) {
	const json = {}
	let index = 0
	headerRow.eachCell((cell) => {
		const value = row.getCell(cell.col).value

		// First occurence of the header
		if (json[cell.value] === undefined) {
			json[cell.value] = value
		}
		else {
			json[`${cell.value} ${index}`] = value
			index++
		}
	})
	return json
}

// https://stackoverflow.com/a/12646864/12191708
export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
}

export function splitCSString(string) {
	if (string === null || string === undefined) return []
	return string.split(',').map(item => item.trim())
}