import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export function DropdownHeaderFragment({children}) {
	return (
		<React.Fragment>
			<Dropdown.Header>
				{children}
			</Dropdown.Header>
		</React.Fragment>
	)
}