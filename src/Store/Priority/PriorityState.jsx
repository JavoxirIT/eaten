import { useState } from "react";
import axios from "axios";
import { PriorityContext } from "../../context/Context";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

export function PriorityState({ children }) {
  const [form] = useForm();
  const [priority, setPriority] = useState([]);
  const [loading, setLoading] = useState(false);

  function getPriority() {
    setLoading(true);
    axios
      .get("/priority")
      .then((res) => {
        if (res.status === 200) {
          setPriority(res.data);
        }
      })
      .catch((err) => {
        console.error("priority:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function addPriority(value) {
    setLoading(true);
    value = {
      ...value,
      color: value.color.toHexString(),
    };
    axios
      .post("priority", value)
      .then((res) => {
        if (res.status === 200) {
          setPriority([...priority, res.data]);
          Swal.fire({
            title: "Malumot qo`shildi!",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        redirect("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function onDelete(state, rec) {
    setLoading(true);
    Swal.fire({
      title: "Ishinchingiz komilmi",
      text: "O'chirgandan keyin ma'lumotlarni tiklab bo'lmaydi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Yo'q`",
      confirmButtonText: "Ha",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`priority/${rec.id}`)
          .then((res) => {
            if (res.status === 200) {
              const dataPriority = priority.filter(
                (item) => item.id !== rec.id
              );
              setPriority(dataPriority);
              Swal.fire({
                title: "O`chirildi!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Ma`lumot O`chirilmadi!",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            redirect("/login");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }
  function onEdit(value) {
    setLoading(true);
    value = {
      ...value,
      color:
        typeof value.color === "string"
          ? value.color
          : value.color.toHexString(),
    };
    Swal.fire({
      title: "Ishinchingiz komilmi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Yo'q`",
      confirmButtonText: "Ha",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`priority/${value.id}`, value)
          .then((res) => {
            if (res.status === 200) {
              const dataPriority = priority.filter(
                (item) => item.id !== value.id
              );
              setPriority(
                [...dataPriority, value].sort((a, b) => (a.id > b.id ? 1 : -1))
              );
              Swal.fire({
                title: "O`zgartirildi!",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Ma`lumot O`gartirilmadi!",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            redirect("/login");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }
  const value = {
    form,
    getPriority,
    priority,
    addPriority,
    onDelete,
    onEdit,
    loading,
  };
  return (
    <PriorityContext.Provider value={value}>
      {children}
    </PriorityContext.Provider>
  );
}
