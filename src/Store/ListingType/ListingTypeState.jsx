import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { ListingType } from "context/Context";
import { useState } from "react";

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
        console.log("listingType:", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteListingType(event, item) {
    console.log(item.id);
  }

  return (
    <ListingType.Provider
      value={{ getLidtingType, listingType, loading, form, deleteListingType }}
    >
      {children}
    </ListingType.Provider>
  );
}
