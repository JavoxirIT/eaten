import { Tag } from "antd";
import { usePriority } from "../../Store/Priority/usePriority";
import { MainTable } from "../MainTable/MainTable";
import PriorityForm from "./PriorityForm";

export default function PriorityList() {
  const { priority, onDelete, addPriority, form, onEdit, loading } =
    usePriority();
  function onClickTableEdit(e) {
    form.setFieldsValue({
      id: e?.id,
      nameuz: e?.nameuz,
      nameru: e?.nameru,
      nameen: e?.nameen,
      descuz: e?.descuz,
      descru: e?.descru,
      descen: e?.descen,
      color: e?.color,
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
      color: "",
    });
  };
  let columns = [
    {
      title: "Nomi UZ",
      dataIndex: "nameuz",
      key: "nameuz",
      className: "priority-desc",
    },
    {
      title: "Batafsil UZ",
      dataIndex: "descuz",
      key: "descuz",
      className: "priority-desc",
    },
    {
      title: "Nomi RU",
      dataIndex: "nameru",
      key: "nameru",
      className: "priority-desc",
    },
    {
      title: "Batafsil RU",
      dataIndex: "descru",
      key: "descru",
      className: "priority-desc",
    },
    {
      title: "Nomi EN",
      dataIndex: "nameen",
      key: "nameen",
      className: "priority-desc",
    },
    {
      title: "Batafsil EN",
      dataIndex: "descen",
      key: "descen",
      className: "priority-desc",
    },
    {
      title: "Rangi",
      dataIndex: "color",
      key: "color",
      className: "priority-desc",
      render: (_, rec) => {
        return <Tag color={rec.color}>Rangi</Tag>;
      },
    },
  ];
  return (
    <div>
      <MainTable
        pdata={priority}
        pcolumns={columns}
        addData={true}
        pageTitle={"Ustunliklar"}
        drawerOneTitle={"Ustunlik qo`shish"}
        drawerThwoTitle={"O'zgartirish"}
        add={<PriorityForm onFinish={addPriority} form={form} />}
        onDelete={onDelete}
        onEdit={onClickTableEdit}
        edit={<PriorityForm onFinish={onEdit} form={form} />}
        setEd={setEd}
        loading={loading}
      />
    </div>
  );
}
