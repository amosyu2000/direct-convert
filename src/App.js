import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Footer } from 'components'
import { RedirectPage } from 'routes'

export function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/:inType?/:outType?"><RedirectPage /></Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}