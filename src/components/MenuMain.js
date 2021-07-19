import React from 'react'
import { Container, Dropdown, Menu, Segment } from 'semantic-ui-react'

export function MenuMain() {
	return (
		<Segment inverted attached color="black">
			<Container>
				<Menu secondary inverted>
					<Menu.Item header>Direct Converter</Menu.Item>
					<Dropdown 
						clearable 
						item 
						placeholder="Select Input" />
					<Menu.Item fitted>to</Menu.Item>
					<Dropdown 
						clearable 
						item 
						placeholder="Select Output" />
				</Menu>
			</Container>
		</Segment>
	)
}