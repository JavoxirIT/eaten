import {useState} from "react";
import {redirect} from "react-router-dom";
import axios from "axios";
import {AllBookingContext} from "../../context/Context";


export function BookingState({children}) {
	const [allBooking, setAllBooking] = useState([])

	function getBooking() {
		axios.get('/booking').then(res => {
			if (res.status === 200) {
				setAllBooking(res.data)
			}
		}).catch(error => {
			redirect('/login')
		})
	}

	const value = {getBooking, allBooking}
	return (
		<AllBookingContext.Provider value={value}>
			{children}
		</AllBookingContext.Provider>
	)
}