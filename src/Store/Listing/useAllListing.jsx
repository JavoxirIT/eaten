import {AllListingContext} from "../../context/Context";
import {useContext} from "react";

export function useAllListing() {
	return useContext(AllListingContext)
}
