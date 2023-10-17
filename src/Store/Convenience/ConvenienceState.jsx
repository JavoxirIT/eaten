import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { Convenience } from "context/Context";

export function ConvenienceState({ children }) {
  const [form] = useForm();
  const [convenience, setConvenience] = useState([]);
  const [loading, setLoading] = useState(false);

  function getConvenience() {
    setLoading(true);
    axios
      .get("convenience")
      .then((res) => {
        if (res.status === 200) {
          setConvenience(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function addConvenience(value) {
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
          .post("convenience", value)
          .then((response) => {
            if (response.status === 200) {
              getConvenience();
              form.resetFields();
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
  function editConvenience(value) {
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
          .put(`convenience/${value.id}`, value)
          .then((response) => {
            if (response.status === 200) {
              getConvenience();
              Swal.fire({
                title: "O`zgartirildi",
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
  function deleteConvenience(event, item) {
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
          .delete(`convenience/${item.id}`)
          .then((response) => {
            if (response.status === 200) {
              getConvenience();
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
    <Convenience.Provider
      value={{
        getConvenience,
        addConvenience,
        editConvenience,
        deleteConvenience,
        convenience,
        loading,
        form,
      }}
    >
      {children}
    </Convenience.Provider>
  );
}
