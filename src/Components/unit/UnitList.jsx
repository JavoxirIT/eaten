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
      width: 180,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Q`isqacha nomi",
      dataIndex: "shortname",
      key: "shortname",
    },
    {
      title: "Q`shimcha ma`lumot",
      dataIndex: "description",
      key: "description",
    },
  ];
  function onUnitEditForm(e) {
    form.setFieldsValue({
      id: e?.id,
      name: e?.name,
      description: e?.description,
      shortname: e?.shortname,
    });
  }
  const setEd = () => {
    form.setFieldsValue({
      id: "",
      name: "",
      description: "",
      shortname: "",
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
