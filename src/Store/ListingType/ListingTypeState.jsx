import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { ListingType } from "context/Context";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

export function ListingTypeState({ children }) {
  const [form] = useForm();
  const [listingType, setListingType] = useState([]);
  const [loading, setLoading] = useState(false);

  function getLidtingType() {
    setLoading(true);
    axios
      .get("listing-type")
      .then((res) => {
        if (res.status === 200) {
          setListingType(res.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function addListingType(value) {
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
          .post(`listing-type`, value)
          .then((res) => {
            if (res.status === 200) {
              getLidtingType();
              //   setListingType([...listingType, res.data]);
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
  function editListingType(value) {
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
          .put(`listing-type/${value.id}`, value)
          .then((res) => {
            if (res.status === 200) {
              getLidtingType();
              //   setListingType([...listingType, res.data]);
              Swal.fire({
                title: "O`zgartirildi",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Ma`lumot O`zgarmadi",
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
  function deleteListingType(event, item) {
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
          .delete(`listing-type/${item.id}`)
          .then((res) => {
            if (res.status === 200) {
              getLidtingType();
              //   setListingType([...listingType, res.data]);
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
            redirect("/login");
          })
          .finally(() => {
            setLoading(false);
          });
      } else setLoading(false);
    });
  }

  return (
    <ListingType.Provider
      value={{
        getLidtingType,
        listingType,
        loading,
        form,
        deleteListingType,
        addListingType,
        editListingType,
      }}
    >
      {children}
    </ListingType.Provider>
  );
}
