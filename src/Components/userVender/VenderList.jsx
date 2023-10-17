import { MainTable } from "Components/MainTable/MainTable";
import { useUserVender } from "Store/UserVenders/useUserVender";
import { Image } from "antd";
import noImage from "../../image/noimage.png";
import { VenderAddForm } from "./VenderAddForm";
export default function UserVenderList() {
  const { venders, loading, form, deleteVender, addVender } = useUserVender();

  let columns = [
    {
      title: "№",
      render: (_, rec, index) => {
        return index + 1;
      },
      width: 60,
      className: "priority-desc",
    },
    {
      title: "Rasmi",
      dataIndex: "img",
      key: "img",
      render: (_, rec) => {
        return (
          <Image src={rec.img !== null ? rec.img : noImage} alt="vender" />
        );
      },
      className: "priority-desc",
    },
    {
      title: "Ismi",
      dataIndex: "firstname",
      key: "firstname",
      className: "priority-desc",
    },
    {
      title: "Sharifi",
      dataIndex: "lastname",
      key: "lastname",
      className: "priority-desc",
    },
    {
      title: "Viloyat",
      dataIndex: "regions",
      key: "regions",
      className: "priority-desc",
      render: (_, rec) => {
        const reg = rec.regions.map((item) => item.nameuz);
        return reg;
      },
    },
    {
      title: "Tuman",
      dataIndex: "tuman",
      key: "tuman",
      className: "priority-desc",
      render: (_, rec) => {
        const tum = rec.tuman.map((item) => item.nameuz);
        return tum;
      },
    },
    {
      title: "Manzili",
      dataIndex: "address",
      key: "address",
      className: "priority-desc",
    },
    {
      title: "Pasport CE",
      dataIndex: "passport",
      key: "passport",
      className: "priority-desc",
    },
    {
      title: "JSHSHIR",
      dataIndex: "jshshir",
      key: "jshshir",
      className: "priority-desc",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
      className: "priority-desc",
    },
    {
      title: "Elektron manzili",
      dataIndex: "email",
      key: "email",
      className: "priority-desc",
    },
    {
      title: "Qo'shimcha malumot",
      dataIndex: "desc",
      key: "desc",
      className: "priority-desc",
    },
  ];

  return (
    <MainTable
      pdata={venders}
      pcolumns={columns}
      addData={true}
      pageTitle="Xizmat ko`rsatuvchilar"
      drawerOneTitle="Foidalanuvchi qo'shish"
      drawerThwoTitle=""
      add={
        <VenderAddForm
          onFinish={addVender}
          form={form}
          submitTitle={"Qo`shish"}
        />
      }
      onDelete={deleteVender}
      //   onEdit={onClickTableEdit}
      //   edit={
      //     <ListingTypeForm
      //       onFinish={editListingType}
      //       form={form}
      //       submitTitle={"Saqlash"}
      //     />
      //   }
      loading={loading}
    />
  );
}
