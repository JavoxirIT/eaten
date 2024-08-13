import { useState } from "react";
import { FoodClass } from "context/Context";
import { useForm } from "antd/es/form/Form";
import { message } from "antd";
import { configs } from "config/config";
import axios from "axios";
import Redirect from "tools/redirect";
import Swal from "sweetalert2";

export function FoodClassState({ children }) {
	const [form] = useForm();
	const [loading, setLoading] = useState(false);
	const [foodClass, setFoodClass] = useState([]);

	function getFoodClass() {
		setLoading(true);
		axios
			.get("food-class")
			.then((res) => {
				if (res.status === 200) {
					setFoodClass(res.data);
				}
			})
			.catch((err) => {
				Redirect("/login");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function postFoodClass(data) {
		setLoading(true)
		Swal.fire({
			title: "Ishinchingiz komilmi",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(`food-class`, data)
					.then((res) => {
						if (res.status === 200) {
							// setFoodType([...foodType, res.data]);
							Swal.fire({
								title: "Qo'shildi",
								icon: "success",
							});
							getFoodClass()
						} else {
							Swal.fire({
								title: "Ma`lumot Qo'shilmadi",
								icon: "error",
							});
						}
					})
					.catch((error) => {
						Redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			} else setLoading(false);
		});
	}
	function putFoodClass(data) {
		setLoading(true)
		Swal.fire({
			title: "Ishinchingiz komilmi",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.put(`food-class/${data.id}`, data)
					.then((res) => {
						if (res.status === 200) {
							setFoodClass([...foodClass.filter((item) => item.id !== data.id), data]);
							Swal.fire({
								title: "Muvofaqiyatli",
								icon: "success",
							});
						} else {
							Swal.fire({
								title: "Ma`lumot Qo'shilmadi",
								icon: "error",
							});
						}
					})
					.catch((error) => {
						Redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			} else setLoading(false);
		});
	}
	function deleteFoodClass(_, data) {
		setLoading(true)
		Swal.fire({
			title: "Ishinchingiz komilmi",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`food-class/${data.id}`)
					.then((res) => {
						if (res.status === 200) {
							setFoodClass(foodClass.filter((item) => item.id !== data.id));
							Swal.fire({
								title: "Muvofaqiyatli",
								icon: "success",
							});
						} else {
							Swal.fire({
								title: "Ooops",
								icon: "error",
							});
						}
					})
					.catch((error) => {
						Redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			} else setLoading(false);
		});
	}
	const imageProps = {
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
	const value = { loading, getFoodClass, foodClass, form, postFoodClass, putFoodClass, deleteFoodClass, imageProps }
	return (
		<FoodClass.Provider value={value}>
			{children}
		</FoodClass.Provider>
	);
}
