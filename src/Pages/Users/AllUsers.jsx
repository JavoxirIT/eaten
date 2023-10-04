import { MainTable } from "../../Components/MainTable/MainTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { AddEmployee } from "./AddEmployee";
import { redirect } from "react-router-dom";
import { Image, message } from "antd";
import { EditEmployee } from "./EditEmployee";

export default function AllUsers() {
  let [users, setUsers] = useState([]);
  let [rend, setRend] = useState(true);
  let [editData, setEditData] = useState({});
  useEffect(() => {
    axios
      .get("/users")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        redirect("/login");
      });
  }, [rend]);

  // address:null
  // desc:null
  // email:"122"
  // firstname:null
  // id:1
  // img:null
  // lastname:null
  // login:"admin12"
  // password:"$2y$10$5pOWYmBIjN.qKKfN3/8J6uuQBWNCDYJCJVZLqrLCLVQal569LX95C"
  // phone:null
  // region_id:null
  // tuman_id:null
  let columns = [
    {
      title: "Rasmi",
      dataIndex: "img",
      key: "img",
      render: (_, rec) => {
        return (
          <Image width={200} src={process.env.REACT_APP_IMAGE_URL + rec?.img} />
        );
      },
    },
    {
      title: "Ismi",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Sharifi",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Viloyat",
      dataIndex: "region_id",
      key: "region_id",
    },
    {
      title: "Tuman",
      dataIndex: "tuman_id",
      key: "tuman_id",
    },
  ];
  const onDelete = (e, rec) => {
    axios
      .get("/users/" + rec.id)
      .then((data) => {
        if (data.status === 200) {
          message.success(`Ma'lumot muvaffaqiyatli O'chirildi`);
          setRend(!rend);
        }
      })
      .catch((data) => {
        message.error(`Ma'lumot muvaffaqiyatli O'chirildi`);
      });
  };
  const onEdit = (rec) => {
    setEditData(rec);
  };
  return (
    <>
      <MainTable
        pageTitle={"Foydalanuvchilar"}
        onDelete={onDelete}
        defkey={"id"}
        pdata={users}
        pcolumns={columns}
        // add={<AddEmployee rend={rend} setR={setRend}/>}
        // edit={<EditEmployee rend={rend} setR={setRend} editData={editData} />}
        // onEdit={onEdit}
        setEd={setEditData}
        addData={false}
      />
    </>
  );
}
