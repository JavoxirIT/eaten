import { MainTable } from "Components/MainTable/MainTable";
import { useCategory } from "Store/Category/useCategory";
import { Image } from "antd";
import { CategoryForm } from "./CategoryForm";

export default function CategoryList() {
  const { category, form, loading, deleteCategory, editCategory, addCategory } =
    useCategory();
  function onClickTableEdit(e) {
    form.setFieldsValue({
      id: e?.id,
      nameuz: e?.nameuz,
      nameru: e?.nameru,
      nameen: e?.nameen,
      descuz: e?.descuz,
      descru: e?.descru,
      descen: e?.descen,
    });
  }
  const setEd = () => {
    form.setFieldsValue({
      id: "",
      nameuz: "",
      nameru: "",
      nameen: "",
      descuz: "",
      descru: "",
      descen: "",
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
    {
      title: "Elon turi",
      dataIndex: "listing_types_id",
      key: "listing_types_id",
      className: "priority-desc",
    },
  ];
  return (
    <MainTable
      pdata={category}
      pcolumns={columns}
      addData={true}
      pageTitle={"Toifalar"}
      drawerOneTitle={"Toifa qo`shish"}
      drawerThwoTitle={"O'zgartirish"}
      add={<CategoryForm onFinish={addCategory} form={form} />}
      onDelete={deleteCategory}
      onEdit={onClickTableEdit}
      edit={<CategoryForm onFinish={editCategory} form={form} />}
      setEd={setEd}
      loading={loading}
    />
  );
}
