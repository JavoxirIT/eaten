import { MainTable } from "Components/MainTable/MainTable";
import { useConvenience } from "Store/Convenience/useConvenience";
import { ConvenienceForm } from "./ConvenienceForm";

export default function ConvenienceList() {
  const {
    addConvenience,
    editConvenience,
    deleteConvenience,
    convenience,
    loading,
    form,
  } = useConvenience();

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
      render: (_, rec, index) => {
        return index + 1;
      },
      width: 100,
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
      key: "descriptionuz",
      className: "priority-desc",
    },
    {
      title: "Batafsil RU",
      dataIndex: "descru",
      key: "descriptionru",
      className: "priority-desc",
    },
    {
      title: "Batafsil EN",
      dataIndex: "descen",
      key: "descriptionen",
      className: "priority-desc",
    },
  ];

  return (
    <MainTable
      pdata={convenience}
      pcolumns={columns}
      addData={true}
      pageTitle={"Toifalar"}
      drawerOneTitle={"Toifa qo`shish"}
      drawerThwoTitle={"O'zgartirish"}
      add={
        <ConvenienceForm
          onFinish={addConvenience}
          form={form}
          submitTitle="Qo`shish"
        />
      }
      onDelete={deleteConvenience}
      onEdit={onClickTableEdit}
      edit={
        <ConvenienceForm
          onFinish={editConvenience}
          form={form}
          submitTitle="Saqlash"
        />
      }
      setEd={setEd}
      loading={loading}
    />
  );
}
