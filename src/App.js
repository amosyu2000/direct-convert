import React, { useState } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import { ButtonConvert, ButtonTemplate, MenuMain, SegmentUpload } from 'components'

export function App() {

	// Parent state to pass the uploaded file between steps 2 and 3
	const [inputFile, setInputFile] = useState(null)

	return (
		<Container fluid>
			<MenuMain />
			<Container className="py-4">
				<Grid divided="vertically">
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">1</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Download the provided <code>.xlsx</code> template and fill it in with your quiz questions.</p>
							<ButtonTemplate />	
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">2</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Upload the completed <code>.xlsx</code> file.</p>
							<SegmentUpload inputFile={inputFile} setInputFile={setInputFile} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header as="h1">3</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Convert to QTI and download.</p>
							<ButtonConvert inputFile={inputFile}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Container>
	)
}