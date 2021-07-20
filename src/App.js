import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Footer } from 'components'
import { ConvertPage, HomePage } from 'routes'

export function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/:inType/:outType"><ConvertPage /></Route>
				<Route path="/:inType?"><HomePage /></Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}