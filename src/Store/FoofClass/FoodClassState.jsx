import { FoodClass } from 'context/Context'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { message } from 'antd'
import { configs } from 'config/config'

export default function FoodClassState({ children }) {

	const [foodClass, setFoodClass] = useState([])
	const [loading, setLoading] = useState(false)
	const [form] = useForm();


	async function getFoodClass() {
		setLoading(true)
		try {
			const response = await axios.get("food-class");
			const data = await response.data;
			if (response.status === 200) {
				setFoodClass(data)
			} else {
				Swal.fire({
					icon: "error",
					title: "Ma`lumotlarni olishda xatolik"
				})
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: error
			})
		} finally {
			setLoading(false)
		}
	}
	function postFoodClass(data) {
		console.log("send", data);
	}
	function updateFoodClass(data) {
		console.log("update", data);
	}
	function deleteFoodClass(_, data) {
		console.log("delete", data);
	}



	const uploadProps = {
		name: "image",
		action: configs.uploadUrl,
		headers: {
			authorization: "authorization-text",
		},
		accept: "image/*",
		onChange(info) {
			if (info.file.status !== "uploading") {
				// console.log(info.file);
				form.setFieldsValue({
					img: info.file.response.data.image,
				});
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} Rasim yuklandi`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} Xatolik rasim yuklanmadi.`);
			}
		},
	};

	const value = { getFoodClass, postFoodClass, updateFoodClass, deleteFoodClass, foodClass, loading, form, uploadProps }

	return (
		<FoodClass.Provider value={value} >{children}</FoodClass.Provider>
	)
}
