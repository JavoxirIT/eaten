import { useUnit } from "../../Store/unit/useUnit";
import { MainTable } from "../MainTable/MainTable";
import UnitForm from "./UnitForm";

export default function UnitList() {
  const { unit, loading, onUnitEdit, form, addUnit, onDeleteUnit } = useUnit();

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (_, rec, index) => {
        return index + 1;
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
      title: "Q`isqacha nomi UZ",
      dataIndex: "shortnameuz",
      key: "shortnameuz",
      className: "priority-desc",
    },
    {
      title: "Q`isqacha nomi RU",
      dataIndex: "shortnameru",
      key: "shortnameru",
      className: "priority-desc",
    },
    {
      title: "Q`shimcha ma`lumot UZ",
      dataIndex: "descriptionuz",
      key: "descriptionuz",
      className: "priority-desc",
    },
    {
      title: "Q`shimcha ma`lumot RU",
      dataIndex: "descriptionru",
      key: "descriptionru",
      className: "priority-desc",
    },
    {
      title: "Q`shimcha ma`lumot EN",
      dataIndex: "descriptionen",
      key: "descriptionen",
      className: "priority-desc",
    },
  ];
  function onUnitEditForm(e) {
    form.setFieldsValue({
      id: e?.id,
      nameuz: e?.nameuz,
      nameen: e?.nameen,
      nameru: e?.nameru,
      descriptionuz: e?.descriptionuz,
      descriptionru: e?.descriptionru,
      descriptionen: e?.descriptionen,
      shortnameuz: e?.shortnameuz,
      shortnameru: e?.shortnameru,
      shortnameen: e?.shortnameen,
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
      shortnameuz: "",
      shortnameru: "",
      shortnameen: "",
    });
  };

  return (
    <MainTable
      pdata={unit}
      pcolumns={columns}
      addData={true}
      pageTitle={"O`lchov birliklari"}
      drawerOneTitle={"O`lchov birlik qo`shish"}
      drawerThwoTitle={"O'zgartirish"}
      add={
        <UnitForm
          onFinish={addUnit}
          form={form}
          submitTitle="Qo`shish"
          hiddenItem={false}
        />
      }
      edit={
        <UnitForm
          hiddenItem={true}
          onFinish={onUnitEdit}
          form={form}
          submitTitle="O`zgartirish"
        />
      }
      onDelete={onDeleteUnit}
      onEdit={onUnitEditForm}
      setEd={setEd}
      loading={loading}
    />
  );
}
