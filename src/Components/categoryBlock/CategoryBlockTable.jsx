import { MainTable } from "Components/MainTable/MainTable";
import useCategoryBlock from "Store/СategoryBlock/useCategoryBlock";
import CategoryBlockForm from "./CategoryBlockForm";

let columns = [
	{
		title: "№",
		dataIndex: "id",
		key: "id",
		className: "priority-desc",
	},
	{
		title: "Nomi",
		dataIndex: "catname",
		key: "catname",
		className: "priority-desc",
	},
];


export default function CategoryBlockTable() {
	const { postCategoryBlock, putCategoryBlock, deleteCategoryBlock, loading, dataCategoryBlock, form } = useCategoryBlock();

	function onClickTableEdit(e) {
		form.setFieldsValue({
			id: e?.id,
			catname: e?.catname,
		});
	}
	const setEd = () => {
		form.setFieldsValue({
			id: "",
			catname: "",
		});
	};

	return (
		<MainTable
			pdata={dataCategoryBlock}
			pcolumns={columns}
			addData={true}
			pageTitle={"Blog"}
			drawerOneTitle={"Qo`shish"}
			drawerThwoTitle={"O'zgartirish"}
			add={<CategoryBlockForm onFinish={postCategoryBlock} form={form} />}
			onDelete={deleteCategoryBlock}
			onEdit={onClickTableEdit}
			edit={<CategoryBlockForm onFinish={putCategoryBlock} form={form} />}
			setEd={setEd}
			loading={loading}
		/>
	);
}
