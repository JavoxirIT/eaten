import React, { useEffect } from 'react'
import useWebSiteText from 'Store/WebSiteText/useWebSiteText'
import WebSiteTextTable from 'Components/webSiteText/WebSiteTextTable';

export default function WebSiteText() {
	const { getDataText } = useWebSiteText();
	useEffect(() => {
		getDataText()
	}, [])
	return <WebSiteTextTable />
}
