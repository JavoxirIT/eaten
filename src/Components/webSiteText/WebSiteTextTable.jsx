import React from 'react'
import WebSiteTextForm from './WebSiteTextForm';
import useWebSiteText from 'Store/WebSiteText/useWebSiteText';
import { MainTable } from 'Components/MainTable/MainTable';

let columns = [
	{
		title: "Nomi UZ",
		dataIndex: "nameuz",
		key: "nameuz",
		className: "priority-desc",
	},
	{
		title: "Nomi RU",
		dataIndex: "nameru",
		key: "nameru",
		className: "priority-desc",
	},
	{
		title: "Nomi EN",
		dataIndex: "nameen",
		key: "nameen",
		className: "priority-desc",
	},
];


export default function WebSiteTextTable() {
	const { loading, translateText, editDataText, form } = useWebSiteText()

	function onClickTableEdit(e) {
		form.setFieldsValue({
			key: e?.key,
			nameuz: e?.nameuz,
			nameru: e?.nameru,
			nameen: e?.nameen,
		});
	}
	const setEd = () => {
		form.setFieldsValue({
			key: "",
			nameuz: "",
			nameru: "",
			nameen: "",
		});
	};

	return (
		<MainTable
			pdata={translateText}
			pcolumns={columns}
			pageTitle={"Saytdagi so`zlar"}
			// drawerOneTitle={"Yangi ta`om turi qo`shish"}
			drawerThwoTitle={"O'zgartirish"}
			onEdit={onClickTableEdit}
			edit={<WebSiteTextForm onFinish={editDataText} form={form} />}
			setEd={setEd}
			loading={loading}
		/>
	);
}
