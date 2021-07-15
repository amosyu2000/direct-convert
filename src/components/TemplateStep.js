import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import template from 'xlsx/Template.xlsx'

export function TemplateStep() { 
	return (
		<React.Fragment>
		<p>Download the provided <code>.xlsx</code> template and fill it in with your quiz questions.</p>
		<a href={template} download="Template.xlsx">
			<Button><Icon name="download" />Download Template</Button>
		</a>
		</React.Fragment>
	)
}