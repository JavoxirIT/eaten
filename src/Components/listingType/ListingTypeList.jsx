import { MainTable } from "Components/MainTable/MainTable";
import { useListingType } from "Store/ListingType/useListingType";
import { Image } from "antd";
import { ListingTypeForm } from "./ListingTypeForm";

export default function ListingTypeList() {
  const { listtingType, form, loading, deleteListingType } = useListingType();

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
      title: "Rasmi",
      dataIndex: "icon",
      key: "icon",
      render: (_, rec, index) => {
        return index + 1;
      },
      className: "priority-desc",
    },
    {
      title: "Rasmi",
      dataIndex: "icon",
      key: "icon",
      render: (_, rec) => {
        return <Image src={rec.icon} />;
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
    {
      title: "Joylangan",
      dataIndex: "created_at",
      key: "created_at",
      className: "priority-desc",
    },
  ];
  return (
    <MainTable
      pdata={listtingType}
      pcolumns={columns}
      addData={true}
      pageTitle={"Toifalar"}
      drawerOneTitle={"Toifa qo`shish"}
      drawerThwoTitle={"O'zgartirish"}
      add={<ListingTypeForm onFinish={addCategory} form={form} />}
      onDelete={deleteListingType}
      onEdit={onClickTableEdit}
      edit={<ListingTypeForm onFinish={editCategory} form={form} />}
      setEd={setEd}
      loading={loading}
    />
  );
}
