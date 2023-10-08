import { useState } from "react";
import { UnitContext } from "../../context/Context";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";

export function UnitState({ children }) {
  const [form] = useForm();
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUnit() {
    setLoading(true);
    axios
      .get(`unit`)
      .then((res) => {
        if (res.status === 200) {
          setUnit(res.data);
        }
      })
      .catch((err) => {
        console.log();
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function addUnit(value) {
    setLoading(true);
    await axios
      .post("unit", value)
      .then((res) => {
        setUnit([...unit, res.data]);
        Swal.fire({
          title: "Malumot qo`shildi!",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        redirect("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function onUnitEdit(value) {
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
          .put(`unit/${value.id}`, value)
          .then((res) => {
            if (res.status === 200) {
              const dataUnit = unit.filter((item) => item.id !== value.id);
              setUnit(
                [...dataUnit, value].sort((a, b) => (a.id > b.id ? 1 : -1))
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
    setLoading(false);
  }
  function onDeleteUnit(event, data) {
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
          .delete(`unit/${data.id}`)
          .then((res) => {
            if (res.status === 200) {
              const dataUnit = unit.filter((item) => item.id !== data.id);
              setUnit(dataUnit);
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
      setLoading(false);
    });
  }

  return (
    <UnitContext.Provider
      value={{
        getUnit,
        unit,
        loading,
        onUnitEdit,
        form,
        addUnit,
        onDeleteUnit,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}
