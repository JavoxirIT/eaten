import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { redirect } from "react-router-dom";
import { ADDED, ARE_YOU_SURE, CHANGED, DATA_CANNOT, DELETED, ERROR_DELETE_FETCH, ERROR_POST_FETCH, ERROR_UPDATE_FETCH, NO, YES } from "tools/const";
import { FoodTypeContext } from "context/Context";

export function FoodTypeState({ children }) {
	const [form] = useForm();
	const [foodType, setFoodType] = useState([]);
	const [loading, setLoading] = useState(false);

	function getFoodType() {
		setLoading(true);
		axios
			.get("food-type")
			.then((res) => {
				if (res.status === 200) {
					setFoodType(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function addFoodType(values) {
		setLoading(true);
		Swal.fire({
			title: ARE_YOU_SURE,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: NO,
			confirmButtonText: YES,
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(`food-type`, values)
					.then((res) => {
						if (res.status === 200) {
							setFoodType([...foodType, res.data]);
							Swal.fire({
								title: ADDED,
								icon: "success",
							});
						} else {
							Swal.fire({
								title: ERROR_POST_FETCH,
								icon: "error",
							});
						}
					})
					.catch((error) => {
						redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			} else setLoading(false);
		});
	}

	function editFoodType(values) {
		console.log("edit", values);

		setLoading(true);
		Swal.fire({
			title: ARE_YOU_SURE,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: NO,
			confirmButtonText: YES,
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.put(`food-type/${values.id}`, values)
					.then((res) => {
						if (res.status === 200) {
							console.log("edit", res.data);
							getFoodType();
							Swal.fire({
								title: CHANGED,
								icon: "success",
							});
						} else {
							Swal.fire({
								title: ERROR_UPDATE_FETCH,
								icon: "error",
							});
						}
					})
					.catch((error) => {
						redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			}
		});
	}

	function deleteFoodType(event, item) {
		setLoading(true);
		Swal.fire({
			title: ARE_YOU_SURE,
			text: DATA_CANNOT,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`food-type/${item.id}`)
					.then((res) => {
						if (res.status === 200) {
							const listData = foodType.filter((i) => i.id !== item.id);
							setFoodType(listData);
							Swal.fire({
								title: DELETED,
								icon: "success",
							});
						} else {
							Swal.fire({
								title: ERROR_DELETE_FETCH,
								icon: "error",
							});
						}
					})
					.catch((error) => {
						redirect("/login");
					})
					.finally(() => {
						setLoading(false);
					});
			} else setLoading(false);
		});
	}

	return (
		<FoodTypeContext.Provider
			value={{
				getFoodType,
				foodType,
				loading,
				form,
				addFoodType,
				deleteFoodType,
				editFoodType,
			}}
		>
			{children}
		</FoodTypeContext.Provider>
	);
}
