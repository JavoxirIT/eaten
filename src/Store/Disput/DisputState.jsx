import { Disput } from 'context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';


export default function DisputState({ children }) {


	const [disputs, setDisputs] = useState([])
	const [loading, setLoding] = useState(false)

	async function getDisput() {
		setLoding(true);
		try {
			const response = await axios.get("disputs");
			const data = await response.data;
			if (response.status === 200) {
				setDisputs(data)
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoding(false)
		}
	}

	async function deleteDisputs(id) {
		setLoding(true);
		try {
			const response = await axios.delete(`disputs/${id}`);
			if (response.status === 200) {
				const data = disputs.filter(el => el.id != id)
				setDisputs(data)
				Swal.fire({
					icon: "success",
					title: "Muvafaqiayli o`chirildi"
				})
			} else {
				Swal.fire({
					icon: "error",
					title: "Diqqat! ma`lumotlat o`chirishda xatolik"
				})
			}
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Diqqat! ma`lumotlat o`chirishda xatolik"
			})
		} finally {
			setLoding(false);
		}
	}


	return <Disput.Provider value={{ getDisput, disputs, loading, deleteDisputs }}>{children}</Disput.Provider>;
}
