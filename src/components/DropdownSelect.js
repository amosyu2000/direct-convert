import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

export function DropdownSelect() {
	return (
		<React.Fragment>
			<Dropdown 
				clearable 
				item 
				placeholder="Select Input" />
			<Menu.Item fitted>to</Menu.Item>
			<Dropdown 
				clearable 
				item 
				placeholder="Select Output" />
		</React.Fragment>
	)
}