import { useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { ListingStatusContext } from "../../context/Context";

export function ListingStatusState({ children }) {
  const [form] = useForm();
  const [listingStatus, setListingStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getListingStatus() {
    setLoading(true);
    await axios
      .get("listing-status")
      .then((res) => {
        if (res.status === 200) {
          setListingStatus(res.data);
        }
      })
      .catch((err) => {
        console.error("listing status:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addListingStatus(value) {
    setLoading(true);
    axios
      .post("listing-status", value)
      .then((res) => {
        if (res.status === 200) {
          setListingStatus([...listingStatus, res.data]);
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

  function onEditListingStatus(value) {
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
          .put(`listing-status/${value.id}`, value)
          .then((res) => {
            if (res.status === 200) {
              const onelistingStatus = listingStatus.filter(
                (item) => item.id !== value.id
              );
              setListingStatus(
                [...onelistingStatus, value].sort((a, b) =>
                  a.id > b.id ? 1 : -1
                )
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

  async function onDelete(rec, key) {
    setLoading(true);
    await Swal.fire({
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
          .delete(`listing-status/${key.id}`)
          .then((res) => {
            if (res.status === 200) {
              const dataListing = listingStatus.filter(
                (item) => item.id !== key.id
              );
              setListingStatus(dataListing);
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

  const value = {
    listingStatus,
    getListingStatus,
    loading,
    form,
    onDelete,
    addListingStatus,
    onEditListingStatus,
  };
  return (
    <ListingStatusContext.Provider value={value}>
      {children}
    </ListingStatusContext.Provider>
  );
}
