import { useState } from "react";
import { AllListingContext } from "../../context/Context";
import axios from "axios";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
import { useAuthUser } from "react-auth-kit";
import { useForm } from "antd/es/form/Form";

export function AllListingState({ children }) {
  const [form] = useForm();
  const auth = useAuthUser();
  const [allListing, setAllListing] = useState([]);
  const [listingOne, setListingOne] = useState([]);
  const [location, setDataLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  function getListing() {
    setLoading(true);
    axios
      .get("/listing")
      .then((res) => {
        if (res.status === 200) {
          setAllListing(res.data);
        }
      })
      .catch((error) => {
        redirect("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onDelete(key) {
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
          .delete(`listing/${key}`)
          .then((res) => {
            if (res.status === 200) {
              const listData = allListing.filter((i) => i.id !== key);
              setAllListing(listData);
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

  function addListing(value) {
    setLoading(true);
    value.location = JSON.stringify(location);
    value.users_id = auth().id;
    value = {
      ...value,
      start_date: dateFormat(value.start_date, "yyyy-mm-dd HH:MM:ss"),
      end_date: dateFormat(value.end_date, "yyyy-mm-dd HH:MM:ss"),
      expry_date: dateFormat(value.expry_date, "yyyy-mm-dd HH:MM:ss"),
      rating: String(value.rating),
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
          .post(`listing`, value)
          .then((res) => {
            if (res.status === 200) {
              setAllListing([...allListing, res.data]);
              localStorage.removeItem("galleryImg");
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
      }
    });
  }

  function getOneListing(id) {
    setLoading(true);
    axios
      .get(`/listing/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setListingOne(res.data);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Ma`lumot topilmadi!",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onEditListing(values) {
    setLoading(true);
    axios
      .put(`listing/${values.id}`, values)
      .then((res) => {
        if (res.status === 200) {
          getOneListing(values.id);
          Swal.fire({
            title: "O`zgartirildi!",
            icon: "success",
          });

          console.log("res", res);
        } else {
          Swal.fire({
            title: "Ma`lumot O`zgartirilmadi!",
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

  const value = {
    getListing,
    getOneListing,
    allListing,
    onDelete,
    addListing,
    setDataLocation,
    loading,
    listingOne,
    onEditListing,
    form,
  };
  return (
    <AllListingContext.Provider value={value}>
      {children}
    </AllListingContext.Provider>
  );
}
