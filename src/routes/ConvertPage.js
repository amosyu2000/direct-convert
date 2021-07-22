import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Grid, Header, Menu, Segment } from 'semantic-ui-react'
import { APP, FILETYPES } from 'admin'
import { ButtonConvert, ButtonTemplate, DropdownSelect, SegmentUpload } from 'components'

export function ConvertPage() {
	const { inType, outType } = useParams()
	// Parent state to pass the uploaded file between steps 2 and 3
	const [inFile, setInFile] = useState(null)

	const { name: inName, extension: inExt } = FILETYPES[inType]
	const { name: outName, extension: outExt } = FILETYPES[outType]

	return (
		<Container fluid>
			<Segment inverted attached color="black">
				<Container textAlign="center">
					<Menu secondary inverted>
						<Menu.Item header><Link to="/">{APP.name}</Link></Menu.Item>
						<Menu.Menu position="right"><DropdownSelect /></Menu.Menu>
					</Menu>
					<Header inverted size="huge" className="py-2">{inName} to {outName} File Conversion Tool</Header>
				</Container>
			</Segment>
			<Container className="py-4">
				<Grid divided="vertically">
					<Grid.Row>
						<Grid.Column width={1}><Header size="huge">1</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Download the provided <code>{inExt}</code> template and fill it in with your quiz questions.</p>
							<ButtonTemplate />	
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header size="huge">2</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Upload the completed <code>{inExt}</code> file.</p>
							<SegmentUpload inFile={inFile} setInFile={setInFile} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1}><Header size="huge">3</Header></Grid.Column>
						<Grid.Column width={15}>
							<p>Convert to <code>{outExt}</code> and download.</p>
							<ButtonConvert inFile={inFile}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Container>
	)
}