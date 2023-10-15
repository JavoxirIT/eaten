import axios from "axios";
import { FoodType } from "../../context/Context";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";

export function FoodTypeState({ children }) {
  const [form] = useForm();
  const [foodType, setFoodType] = useState([]);
  const [loading, setLoading] = useState(false);

  function getFoodType() {
    setLoading(true);
    axios
      .get("food-type")
      .then((res) => {
        if (res.status === 200) {
          setFoodType(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addFoodType(values) {
    setLoading(true);
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
          .post(`food-type`, values)
          .then((res) => {
            if (res.status === 200) {
              setFoodType([...foodType, res.data]);
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

  function editFoodType(values) {
    console.log("edit", values);

    setLoading(true);
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
          .put(`food-type/${values.id}`, values)
          .then((res) => {
            if (res.status === 200) {
              console.log("edit", res.data);
              getFoodType();
              Swal.fire({
                title: "O`zgartirildi",
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
      }
    });
  }

  function deleteFoodType(event, item) {
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
          .delete(`food-type/${item.id}`)
          .then((res) => {
            if (res.status === 200) {
              const listData = foodType.filter((i) => i.id !== item.id);
              setFoodType(listData);
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
      } else setLoading(false);
    });
  }

  return (
    <FoodType.Provider
      value={{
        getFoodType,
        foodType,
        loading,
        form,
        addFoodType,
        deleteFoodType,
        editFoodType,
      }}
    >
      {children}
    </FoodType.Provider>
  );
}
