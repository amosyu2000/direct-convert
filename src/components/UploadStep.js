import React, { useState } from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

export function UploadStep({setInputFile}) {

	const [dragging, setDragging] = useState(false)

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
		console.log(files)
	}

	return (
		<React.Fragment>
			<p>Upload the completed <code>.xlsx</code> file.</p>
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
						<Button secondary>
							<Icon name="folder open" /> Browse Files
						</Button>
					</React.Fragment>
					}	
					<div 
						onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} 
						style={{position: 'absolute', height: '100%', width: '100%', left: 0}} 
					/>
				</Segment>
		</React.Fragment>
	)
}