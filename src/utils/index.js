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

export async function populateXML(filepath, json) {
	const encodings = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\n': '&lt;br&gt;'
	}
	const file = await axios(filepath)
	let text = file.data
	Object.entries(json).forEach(([k,v]) => {
		let cleanValue = v.toString()
		// Encode special characters if the value is not already an XML
		const reXML = new RegExp(/^<(\w+)(\s+[\s\S]*)?>[\s\S]*<\/(\1)>$/)
		if (!reXML.test(cleanValue.trim())) {
			console.log(`"${cleanValue}"`)
			Object.entries(encodings).forEach(([l,w]) => {
				const re = new RegExp(l, 'g')
				cleanValue = cleanValue.replace(re, w)
			})
		}
		const re = new RegExp(`{${k}}`, 'g')
		text = text.replace(re, cleanValue)
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

// https://stackoverflow.com/a/12646864/12191708
export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
}