import { ListingType } from "context/Context";
import { useContext } from "react";

export function useListingType() {
  return useContext(ListingType);
}
