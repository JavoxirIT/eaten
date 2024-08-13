import { WebSiteText } from 'context/Context'
import React, { useContext } from 'react'

export default function useWebSiteText() {
	return useContext(WebSiteText)
}
