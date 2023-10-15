import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Category } from "context/Context";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

export function CategoryState({ children }) {
  const [form] = useForm();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCategory() {
    setLoading(true);
    axios
      .get("category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deleteCategory(event, item) {
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
          .delete(`category/${item.id}`)
          .then((res) => {
            if (res.status === 200) {
              const listData = category.filter((i) => i.id !== item.id);
              setCategory(listData);
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
    setLoading(false);
  }
  function addCategory(value) {
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
          .post(`category`, value)
          .then((res) => {
            if (res.status === 200) {
              setCategory([...category, res.data]);
              Swal.fire({
                title: "Qo'shildi",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Ma`lumot Qo'shilmadi",
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
      } else setLoading(false);
    });
  }
  function editCategory(value) {
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
          .put(`category/${value.id}`, value)
          .then((res) => {
            if (res.status === 200) {
              getCategory();
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
      } else setLoading(false);
    });
  }

  return (
    <Category.Provider
      value={{
        category,
        getCategory,
        form,
        loading,
        deleteCategory,
        editCategory,
        addCategory,
      }}
    >
      {children}
    </Category.Provider>
  );
}
