import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import template from 'xlsx/Template.xlsx'

// Provides the user with a downloadable template to fill out
export function ButtonTemplate() { 
	return (
		<a href={template} download="Template.xlsx">
			<Button><Icon name="download" />Download Template</Button>
		</a>
	)
}