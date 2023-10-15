import { MainTable } from "Components/MainTable/MainTable";
import { useFoodType } from "Store/FoodType/useFoodType";
import { Image } from "antd";
import FoodTypeAdd from "./FoodTypeForm";

export default function FoodTypeList() {
  const { foodType, loading, form, addFoodType, deleteFoodType, editFoodType } =
    useFoodType();

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
  let columns = [
    {
      title: "Rasmi",
      dataIndex: "img",
      key: "img",
      render: (_, rec) => {
        return <Image src={rec.img} alt="taom rasmi" />;
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
  return (
    <MainTable
      pdata={foodType}
      pcolumns={columns}
      addData={true}
      pageTitle={"Taomlar"}
      drawerOneTitle={"Yangi taom qo`shish"}
      drawerThwoTitle={"O'zgartirish"}
      add={<FoodTypeAdd onFinish={addFoodType} form={form} />}
      onDelete={deleteFoodType}
      onEdit={onClickTableEdit}
      edit={<FoodTypeAdd onFinish={editFoodType} form={form} />}
      setEd={setEd}
      loading={loading}
    />
  );
}
