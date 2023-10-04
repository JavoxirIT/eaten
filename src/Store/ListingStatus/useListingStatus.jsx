import { useContext } from "react";
import { ListingStatusContext } from "../../context/Context";

export function useListingStatus() {
  return useContext(ListingStatusContext);
}
