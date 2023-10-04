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
      name: e?.name,
      color: e?.color,
      desc: e?.desc,
    });
  }
  const setEd = () => {
    form.setFieldsValue({
      id: "",
      name: "",
      color: "",
      desc: "",
    });
  };
  let columns = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rangi",
      dataIndex: "color",
      key: "color",
      render: (_, rec) => {
        return <Tag color={rec.color}>Rangi</Tag>;
      },
    },
    {
      title: "Batafsil",
      dataIndex: "desc",
      key: "desc",
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
