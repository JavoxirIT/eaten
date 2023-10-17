import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { UserVender } from "context/Context";
import { useState } from "react";
import Swal from "sweetalert2";

export function UserVenderState({ children }) {
  const [form] = useForm();
  const [venders, setVender] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUserVender() {
    setLoading(true);
    axios
      .get("usersvendor")
      .then((res) => {
        if (res.status === 200) {
          setVender(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function addVender(value) {
    value.role = "vendor";
    setLoading(true);
    Swal.fire({
      title: "Ishonchingiz komilmi",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Yo`q",
      confirmButtonText: "Ha",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("users", value)
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              getUserVender();
              //   form.resetFields();
              Swal.fire({
                title: "Qo`shildi",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Xatolik",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else setLoading(false);
    });
    setLoading(false);
  }

  function deleteVender(event, item) {
    setLoading(true);
    Swal.fire({
      title: "Ishonchingiz komilmi",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Yo`q",
      confirmButtonText: "Ha",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`users/${item.id}`)
          .then((response) => {
            if (response.status === 200) {
              getUserVender();
              Swal.fire({
                title: "O`chirildi",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Xatolik",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else setLoading(false);
    });
  }

  return (
    <UserVender.Provider
      value={{ venders, getUserVender, loading, form, deleteVender, addVender }}
    >
      {children}
    </UserVender.Provider>
  );
}
