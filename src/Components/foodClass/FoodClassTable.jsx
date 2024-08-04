
import { useEffect } from "react";
import { MainTable } from "Components/MainTable/MainTable";
import useFoodClass from "Store/FoofClass/useFoodClass";
import { Image } from "antd"
import FoodClassForm from "./FoodClassForm";
export default function FoodClassTable() {
	const { getFoodClass, postFoodClass, updateFoodClass, deleteFoodClass, foodClass, loading, form, uploadProps } =
		useFoodClass();


	useEffect(() => { getFoodClass(); }, [])

	function onClickTableEdit(e) {
		form.setFieldsValue({
			id: e?.id,
			nameuz: e?.nameuz,
			nameru: e?.nameru,
			nameen: e?.nameen,
			descriptionuz: e?.descriptionuz,
			descriptionru: e?.descriptionru,
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
	let columns = [
		{
			title: "№",
			dataIndex: "id",
			key: "id",
			className: "priority-desc",
			render: (_, rec, index) => {
				return index + 1;
			},
		},
		{
			title: "Rasmi",
			dataIndex: "img",
			key: "img",
			render: (_, rec) => {
				return <Image src={rec.img} style={{ width: "50px" }} />;
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
			dataIndex: "descuz",
			key: "descuz",
			className: "priority-desc",
		},
		{
			title: "Batafsil RU",
			dataIndex: "descru",
			key: "descru",
			className: "priority-desc",
		},
		{
			title: "Batafsil EN",
			dataIndex: "descen",
			key: "descen",
			className: "priority-desc",
		},
	];




	return (
		<MainTable
			pdata={foodClass}
			pcolumns={columns}
			addData={true}
			pageTitle={"Ta`omlar turi"}
			drawerOneTitle={"Qo`shish"}
			drawerThwoTitle={"O`zgartirish"}
			onDelete={deleteFoodClass}
			onEdit={onClickTableEdit}
			setEd={setEd}
			loading={loading}
			edit={<FoodClassForm form={form} onFinish={updateFoodClass} uploadProps={uploadProps} />}
			add={<FoodClassForm form={form} onFinish={postFoodClass} uploadProps={uploadProps} />}
		/>
	);
}
