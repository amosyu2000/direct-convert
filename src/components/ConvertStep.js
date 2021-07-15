import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export function ConvertStep({inputfile}) {
	return (
		<React.Fragment>
		<p>Convert to QTI and download.</p>
			<Button primary>
				<Icon name="random" /> Convert
			</Button>
		</React.Fragment>
	)
}