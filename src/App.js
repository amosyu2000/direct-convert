import React from 'react'
import { Button, Container, Grid, Header, Icon, Label, Menu, Segment } from 'semantic-ui-react'

export function App() {
	return (
		<Container fluid>
			<Menu attached borderless>
				<Menu.Item header>Simple Converter</Menu.Item>
				<Menu.Item>
					<Label color="green">.XLSX</Label> 
					to
					<Label color="orange">QTI</Label>
				</Menu.Item>
			</Menu>
			<Container className="py-4">
				<Grid divided="vertically">
					<Grid.Row>
						<Grid.Column width={1}>
							<Header as="h1">1</Header>
						</Grid.Column>
						<Grid.Column width={15}>
							<p>Download the provided <code>.xlsx</code> template and fill it in with your questions.</p>
							<Button>
								<Icon name="download" /> Download Template
							</Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}>
							<Header as="h1">2</Header>
						</Grid.Column>
						<Grid.Column width={15}>
							<p>Upload the completed <code>.xlsx</code> file.</p>
							<Segment placeholder textAlign="center">
								<Header icon>
									<Icon name="folder open outline" />
									Drag and drop to upload file
								</Header>
								<p>OR</p>
								<Button secondary>
									<Icon name="folder open" /> Browse Files
								</Button>
							</Segment>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}>
							<Header as="h1">3</Header>
						</Grid.Column>
						<Grid.Column width={15}>
							<p>Convert to QTI and download.</p>
							<Button primary>
								<Icon name="random" /> Convert
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Container>
	)
}