import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { CONFIG } from 'admin'
import { HomePage, ConvertPage } from 'routes'

// Checks if the params passed in the URL are valid and redirects accordingly
export function RedirectPage() {
	const { inType, outType } = useParams()

	if (CONFIG[inType] !== undefined && outType !== undefined) {
		// If both params are valid
		if (CONFIG[inType]?.[outType] !== undefined) return <ConvertPage />
		// If the first param is valid but the second is invalid
		else return <Redirect to={`/${inType}`} />
	}
	else if (inType !== undefined) {
		// If the first param is invalid
		if (CONFIG[inType]) return <HomePage />
		// If the first param is valid and the second does not exist
		else return <Redirect to="/" />
	}
	else {
		// If neither the first nor second param exist
		return <HomePage />
	}
}