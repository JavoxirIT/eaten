import { MainTable } from "Components/MainTable/MainTable";
import { useListingType } from "Store/ListingType/useListingType";
import { ListingTypeForm } from "./ListingTypeForm";
import { Image } from "antd";
import { useEffect } from "react";

let columns = [
	{
		title: "№",
		render: (_, rec, index) => {
			return index + 1;
		},
		width: 100,
		className: "priority-desc",
	},
	{
		title: "Rasmi",
		dataIndex: "img",
		key: "img",
		render: (_, rec) => {
			return <Image src={rec.icon} alt="taom rasmi" />;
		},
		className: "priority-desc",
	},
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
	{
		title: "Batafsil UZ",
		dataIndex: "descriptionuz",
		key: "descriptionuz",
		className: "priority-desc",
	},
	{
		title: "Batafsil RU",
		dataIndex: "descriptionru",
		key: "descriptionru",
		className: "priority-desc",
	},
	{
		title: "Batafsil EN",
		dataIndex: "descriptionen",
		key: "descriptionen",
		className: "priority-desc",
	},
];

export default function ListingTypeList() {
	const {
		listingType,
		form,
		loading,
		deleteListingType,
		addListingType,
		editListingType,
		getLidtingType
	} = useListingType();


	function onClickTableEdit(e) {
		form.setFieldsValue({
			id: e?.id,
			nameuz: e?.nameuz,
			nameru: e?.nameru,
			nameen: e?.nameen,
			descriptionuz: e?.descriptionuz,
			descriptionru: e?.descriptionru,
			descriptionen: e?.descriptionen,
			icon: e?.icon,
		});
	}
	const setEd = () => {
		form.setFieldsValue({
			id: "",
			nameuz: "",
			nameru: "",
			nameen: "",
			descriptionuz: "",
			descriptionru: "",
			descriptionen: "",
			icon: "",
		});
	};



	useEffect(() => {
		getLidtingType();
	}, [])

	return (
		<MainTable
			pdata={listingType}
			pcolumns={columns}
			addData={true}
			pageTitle={"Toifalar"}
			drawerOneTitle={"Toifa qo`shish"}
			drawerThwoTitle={"O'zgartirish"}
			add={
				<ListingTypeForm
					onFinish={addListingType}
					form={form}
					submitTitle={"Qo`shish"}
				/>
			}
			onDelete={deleteListingType}
			onEdit={onClickTableEdit}
			edit={
				<ListingTypeForm
					onFinish={editListingType}
					form={form}
					submitTitle={"Saqlash"}
				/>
			}
			setEd={setEd}
			loading={loading}
		/>
	);
}
