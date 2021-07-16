import React, { useState } from 'react'
import { Container, Grid, Header, Label, Menu} from 'semantic-ui-react'
import { ConvertStep, TemplateStep, UploadStep } from 'components'

export function App() {

	// Parent state to pass the uploaded file between steps 2 and 3
	const [inputFile, setInputFile] = useState(null)

	return (
		<Container fluid>
			<Menu attached borderless>
				<Menu.Item header>Direct Converter</Menu.Item>
				<Menu.Item>
					<Label color="green">.XLSX</Label> to <Label color="orange">QTI</Label>
				</Menu.Item>
			</Menu>
			<Container className="py-4">
				<Grid divided="vertically">
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">1</Header></Grid.Column>
						<Grid.Column width={15}><TemplateStep /></Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">2</Header></Grid.Column>
						<Grid.Column width={15}><UploadStep inputFile={inputFile} setInputFile={setInputFile} /></Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">3</Header></Grid.Column>
						<Grid.Column width={15}><ConvertStep inputFile={inputFile}/></Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Container>
	)
}