import React from 'react'
import { Container, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import { APP } from 'admin'
import { DropdownSelect } from 'components'

export function HomePage() {
	return (
		<Container fluid className="py-5" style={{height:'100%'}}>
			<Segment inverted attached color="black" textAlign="center" padded="very">
					<Header inverted size="huge">
						<Icon name="paper plane" />{APP.name}
					</Header>
					<Menu secondary inverted compact>
						<DropdownSelect />
					</Menu>
			</Segment>
		</Container>
	)
}