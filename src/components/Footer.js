import React from 'react'
import { Grid, Icon, Segment } from 'semantic-ui-react'
import { APP } from 'admin'

export function Footer() {
	return (
		<Segment inverted attached color="black" textAlign="center">
			<Grid>
				<Grid.Row>
					<Grid.Column textAlign="center" width={16}>Made with <Icon name="heart" /> by <a className="link" href={APP.authorURL}>{APP.author}</a></Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	)
}