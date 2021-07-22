import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { CONFIG, FILETYPES } from 'admin'

// Dropdown menu items for selecting the input and output file types
export function DropdownSelect() {
	const history = useHistory()
	const { inType, outType } = useParams()

	const inOptions = Object.keys(CONFIG).map((key) => ({text: `${FILETYPES[key]?.name} (${FILETYPES[key]?.extension})`, value: key}))

	let outOptions = null
	if (inType !== undefined) {
		outOptions = Object.keys(CONFIG[inType]).map((key) => ({text: `${FILETYPES[key]?.name} (${FILETYPES[key]?.extension})`, value: key}))
	}

	function onInOptionChange(_, data) {
		const newHistory = [data.value, outType].filter(n => n).join('/')
		history.push(`/${newHistory}`)
	}

	function onOutOptionChange(_, data) {
		history.push(`/${inType}/${data.value}`)
	}

	return (
		<React.Fragment>
			<Dropdown 
				clearable
				defaultValue={inType}
				item 
				onChange={onInOptionChange}
				options={inOptions}
				placeholder="Select Input" 
			/>
			<Menu.Item fitted>to</Menu.Item>
			<Dropdown 
				clearable
				defaultValue={outType}
				disabled={!outOptions}
				item 
				onChange={onOutOptionChange}
				options={outOptions}
				placeholder="Select Output" 
			/>
		</React.Fragment>
	)
}