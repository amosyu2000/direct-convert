import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { FILETYPES } from 'admin'
import { formatBytes } from 'utils'

// A drag and drop region to upload files
// Also includes a "Browse Files" button if the user wants to open File Explorer
export function SegmentUpload({inFile, setInFile}) {

	const { inType } = useParams()
	// States for drag and drop functionality
	const [dragging, setDragging] = useState(false)
	// Ref to the hidden file input
	const fileInput = useRef('in')
	// States for file storage
	const [fileState, setFileState] = useState('EMPTY')

	const { name: inName, extension: inExt } = FILETYPES[inType]

	// Drag handlers
	function handleDragOver(e) {
		e.preventDefault()
	}
	
	function handleDragEnter(e) {
		e.preventDefault()
		setDragging(true)
	}
	
	function handleDragLeave(e) {
		e.preventDefault()
		setDragging(false)
	}
	
	function handleDrop(e) {
		e.preventDefault()
		setDragging(false)
		const files = e.dataTransfer.files
		handleFiles(files)
	}

	// Decides how to alter the states depending on the file input that was received
	function handleFiles(files) {
		// User should only drag in one file
		if (files.length !== 1) {
			return setFileState('ERROR_MULTIPLE')
		}
		const file = files[0]
		// The file should be the correct input filetype
		const extensionRe = new RegExp(`${inExt}$`)
		if (!extensionRe.test(file.name)) {
			return setFileState('ERROR_TYPE')
		}
		setInFile(file)
	}

	function removeFile() {
		setInFile(null)
		setFileState('EMPTY')
	}

	return (
		<React.Fragment>
			<Segment className={dragging ? 'raised secondary' : ''} placeholder textAlign="center">
				{dragging ?
				<Header icon>
					<Icon name="folder open outline" />
					Drop file here to upload
				</Header>
				:
				<React.Fragment>
					<Header icon>
						<Icon name="file outline" />
						Drag and drop to upload file
					</Header>
					<p>OR</p>
					<Button secondary onClick={() => fileInput.current.click()} style={{zIndex: 2}}>
						<Icon name="folder open" /> Browse Files
					</Button>
					<input type="file" ref={fileInput} onChange={(e) => handleFiles(e.target.files)} style={{display:'none'}} />
				</React.Fragment>
				}
				<div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} style={{position: 'absolute', inset: 0}} />
			</Segment>
			{(() => {
				// Display uploaded file given that the file type is correct
				if (inFile) {
					return (
						<Segment inverted color="green">
							<Grid stackable columns={2}>
								<Grid.Row>
									<Grid.Column width={15}><Icon name="file outline" /> {inFile.name} ({formatBytes(inFile.size)})</Grid.Column>
									<Grid.Column width={1} textAlign="right"><Icon link name="close" onClick={removeFile} /></Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					)
				}
				// The user uploaded multiple files
				else if (fileState === 'ERROR_MULTIPLE') {
					return (
						<Segment inverted tertiary color="red">
							<Icon name="warning sign" /> Only one file can be converted at a time.
						</Segment>
					)
				}
				// The user uploaded a folder/incorrect file type
				else if (fileState === 'ERROR_TYPE') {
					return (
						<Segment inverted tertiary color="red">
							<Icon name="warning sign" /> Only {inName} <code>{inExt}</code> files are supported for this conversion type.
						</Segment>
					)
				}
				return null
			})()}
		</React.Fragment>
	)
}