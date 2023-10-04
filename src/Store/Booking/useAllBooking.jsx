import {useContext} from "react";
import {AllBookingContext} from "../../context/Context";

export function useAllBooking(){
	return useContext(AllBookingContext)
}