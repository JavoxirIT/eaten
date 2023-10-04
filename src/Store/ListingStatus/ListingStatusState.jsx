import axios from "axios";
import { ListingStatusContext } from "../../context/Context";
import { useState } from "react";

export function ListingStatusState({ children }) {
  const [listingStatus, setListingStatus] = useState([]);

  function getListingStatus() {
    axios
      .get("listing-status")
      .then((res) => {
        if (res.status === 200) {
          setListingStatus(res.data);
        }
      })
      .catch((err) => {
        console.error("listing status:", err);
      });
  }
  return (
    <ListingStatusContext.Provider value={{ listingStatus, getListingStatus }}>
      {children}
    </ListingStatusContext.Provider>
  );
}
