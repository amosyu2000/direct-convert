import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Header, Menu, Segment } from 'semantic-ui-react'
import { APP } from 'admin'
import { ButtonConvert, ButtonTemplate, DropdownSelect, SegmentUpload } from 'components'

export function ConvertPage() {
	// Parent state to pass the uploaded file between steps 2 and 3
	const [inputFile, setInputFile] = useState(null)

	return (
		<Container fluid>
			<Segment inverted attached color="black">
				<Container>
					<Menu secondary inverted>
						<Menu.Item header><Link to="/">{APP.name}</Link></Menu.Item>
						<DropdownSelect />
					</Menu>
				</Container>
			</Segment>
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