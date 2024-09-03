import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Category } from "context/Context";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { ADDED, ARE_YOU_SURE, CHANGED, DATA_CANNOT, DELETED, ERROR_DELETE_FETCH, ERROR_UPDATE_FETCH } from "tools/const";

export function CategoryState({ children }) {
	const [form] = useForm();
	const [category, setCategory] = useState([]);
	const [loading, setLoading] = useState(false);

	function getCategory() {
		setLoading(true);
		axios
			.get("category")
			.then((res) => {
				setCategory(res.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}
	function deleteCategory(event, item) {
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
					.delete(`category/${item.id}`)
					.then((res) => {
						if (res.status === 200) {
							const listData = category.filter((i) => i.id !== item.id);
							setCategory(listData);
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
			}
		});
		setLoading(false);
	}
	function addCategory(value) {
		Swal.fire({
			title: ARE_YOU_SURE,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(`category`, value)
					.then((res) => {
						if (res.status === 200) {
							setCategory([...category, res.data]);
							Swal.fire({
								title: ADDED,
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
			} else setLoading(false);
		});
	}
	function editCategory(value) {
		Swal.fire({
			title: ARE_YOU_SURE,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.put(`category/${value.id}`, value)
					.then((res) => {
						if (res.status === 200) {
							getCategory();
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
			} else setLoading(false);
		});
	}

	return (
		<Category.Provider
			value={{
				category,
				getCategory,
				form,
				loading,
				deleteCategory,
				editCategory,
				addCategory,
			}}
		>
			{children}
		</Category.Provider>
	);
}
