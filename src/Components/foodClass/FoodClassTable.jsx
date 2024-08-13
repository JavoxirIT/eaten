
import { useEffect } from "react";
import { MainTable } from "Components/MainTable/MainTable";
import useFoodClass from "Store/FoofClass/useFoodClass";
import { Image } from "antd"
import FoodClassForm from "./FoodClassForm";

let columns = [
	{
		title: "Rasmi",
		dataIndex: "img",
		key: "img",
		render: (_, rec) => {
			return <Image width={50} src={rec.img} alt="image" />;
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


export default function FoodClassTable() {
	const { loading, foodClass, form, postFoodClass, putFoodClass, deleteFoodClass, imageProps } = useFoodClass();

	function onClickTableEdit(e) {
		form.setFieldsValue({
			id: e?.id,
			nameuz: e?.nameuz,
			nameru: e?.nameru,
			nameen: e?.nameen,
			descriptionru: e?.descriptionru,
			descriptionuz: e?.descriptionuz,
			descriptionen: e?.descriptionen,
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
		});
	};

	return (
		<MainTable
			pdata={foodClass}
			pcolumns={columns}
			addData={true}
			pageTitle={"Ta`om turi"}
			drawerOneTitle={"Yangi ta`om turi qo`shish"}
			drawerThwoTitle={"O'zgartirish"}
			add={<FoodClassForm onFinish={postFoodClass} form={form} imageProps={imageProps} />}
			onDelete={deleteFoodClass}
			onEdit={onClickTableEdit}
			edit={<FoodClassForm onFinish={putFoodClass} form={form} imageProps={imageProps} />}
			setEd={setEd}
			loading={loading}
		/>
	);
}
