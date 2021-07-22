import { saveAs } from 'file-saver'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { CONFIG } from 'admin'

export function ButtonConvert({inFile}) {

	const { inType, outType } = useParams()
	const [isConverting, setConverting] = useState(false)
	const [isConverted, setConverted] = useState(false)
	const [blob, setBlob] = useState(null)

	// Reset convert button every time a file is added/removed/replaced
	useEffect(() => {
		setConverting(false)
		setConverted(false)
	}, [inFile])

	// Converts the .xlsx file into QTI
	function convert() {
		setConverting(true)

		// Get the appropriate engine
		const { convertEngine } = CONFIG[inType][outType]
		convertEngine(inFile, callback)

		function callback(outBlob) {
			setBlob(outBlob)
			// Finish up
			setConverting(false)
			setConverted(true)
		}
	}

	async function download() {
		// The output file will always have the same file name as the input file, just with a different extension
		const title = inFile.name.split('.')[0]
		saveAs(blob, `${title}.zip`)
	}

	return (
		<Button disabled={inFile === null || isConverting} loading={isConverting} onClick={isConverted ? download : convert} primary>
			<Icon name={isConverted ? 'download' : 'random'} /> {isConverted ? 'Download QTI' : 'Convert'}
		</Button>
	)
}