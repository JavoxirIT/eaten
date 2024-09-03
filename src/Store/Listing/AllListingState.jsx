import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useForm } from "antd/es/form/Form";
import { AllListingContext } from "context/Context";
import { Tag, message, notification } from "antd";
import { configs } from "config/config";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CloudUploadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import useLocalStorage from "hook/useLocalStorage";


export function AllListingState({ children }) {
	const [imageList, setImageList] = useLocalStorage([], "galleryImg");
	const authHeader = useAuthHeader();
	const [form] = useForm();
	const auth = useAuthUser();
	const [allListing, setAllListing] = useState([]);
	const [listingOne, setListingOne] = useState([]);
	const [dataLocation, setDataLocation] = useState({ lat: 0, lng: 0 });
	const [loading, setLoading] = useState(false);
	const [image, setImages] = useState([])

	function getListing() {
		setLoading(true);
		axios
			.get("/listing")
			.then((res) => {
				if (res.status === 200) {
					setAllListing(res.data);
				}
			})
			.catch((error) => {
				redirect("/login");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function onDelete(key) {
		setLoading(true);
		Swal.fire({
			title: "Ishinchingiz komilmi",
			text: "O'chirgandan keyin ma'lumotlarni tiklab bo'lmaydi",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Yo'q`",
			confirmButtonText: "Ha",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`listing/${key}`)
					.then((res) => {
						if (res.status === 200) {
							const listData = allListing.filter((i) => i.id !== key);
							setAllListing(listData);
							Swal.fire({
								title: "O`chirildi!",
								icon: "success",
							});
						} else {
							Swal.fire({
								title: "Ma`lumot O`chirilmadi!",
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

	function addListing(values) {
		values.location = dataLocation;
		console.log(values);
		// setLoading(true);

		// let arr = [];
		// let date = [];
		// if (values?.food_a !== undefined) {
		// 	for (let item of values?.food_a) {
		// 		for (let foodClass of item?.food_class) {
		// 			arr.push({
		// 				food_type: item.food_type,
		// 				food_class: foodClass,
		// 				price: 2,
		// 				class: "food_a",
		// 			})
		// 		}
		// 	}
		// }
		// if (values?.food_b?.length !== undefined) {
		// 	for (let item of values?.food_b) {
		// 		for (let foodClass of item?.food_class) {
		// 			arr.push({
		// 				food_type: item.food_type,
		// 				food_class: foodClass,
		// 				price: 2,
		// 				class: "food_b",
		// 			})
		// 		}
		// 	}
		// }
		// if (values?.food_d?.length !== undefined) {
		// 	for (let item of values?.food_d) {
		// 		for (let foodClass of item?.food_class) {
		// 			arr.push({
		// 				food_type: item.food_type,
		// 				food_class: foodClass,
		// 				price: 2,
		// 				class: "food_d",
		// 			})
		// 		}
		// 	}
		// }
		// delete values.food_a;
		// delete values.food_b;
		// delete values.food_d;
		// values.foods = arr;

		// if (values?.fdate?.length !== 0) {
		// 	for (let item of values.fdate) {
		// 		date.push(dayjs(item).format('YYYY-MM-DD'))
		// 	}
		// }
		// values.fdate = date;
		// values.location = dataLocation;
		// values = {
		// 	...values,
		// 	fromTime: dayjs(values['fromTime']).format("HH-MM"),
		// 	toTime: dayjs(values['toTime']).format("HH-MM")
		// }

		// values.users_id = auth.id;
		// Swal.fire({
		// 	title: "Ishinchingiz komilmi",
		// 	icon: "warning",
		// 	showCancelButton: true,
		// 	confirmButtonColor: "#3085d6",
		// 	cancelButtonColor: "#d33",
		// 	cancelButtonText: "Yo'q`",
		// 	confirmButtonText: "Ha",
		// }).then((result) => {
		// 	if (result.isConfirmed) {
		// 		axios
		// 			.post(`listing`, values)
		// 			.then((res) => {
		// 				if (res.status === 200) {
		// 					setAllListing([...allListing, res.data]);
		// 					localStorage.removeItem("galleryImg");
		// 					Swal.fire({
		// 						title: "Qo'shildi",
		// 						icon: "success",
		// 					});
		// 				} else {
		// 					Swal.fire({
		// 						title: "Ma`lumot Qo'shilmadi",
		// 						icon: "error",
		// 					});
		// 				}
		// 			})
		// 			.catch((error) => {
		// 				redirect("/login");
		// 			})
		// 			.finally(() => {
		// 				setLoading(false);
		// 			});
		// 	}
		// });
	}

	function getOneListing(id) {
		setLoading(true);
		axios
			.get(`/listing/${id}`)
			.then((res) => {
				if (res.status === 200) {
					setListingOne([res.data]);
					setImageList(JSON.parse(res.data?.gallery))
				}
			})
			.catch((error) => {
				Swal.fire({
					title: "Ma`lumot topilmadi!",
					icon: "error",
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function onEditListing(values) {

		let arr = [];
		let date = [];
		if (values?.food_a !== undefined) {
			for (let item of values?.food_a) {
				for (let foodClass of item?.food_class) {
					arr.push({
						food_type: item.food_type,
						food_class: foodClass,
						price: 2,
						class: "food_a",
					})
				}
			}
		}
		if (values?.food_b?.length !== undefined) {
			for (let item of values?.food_b) {
				for (let foodClass of item?.food_class) {
					arr.push({
						food_type: item.food_type,
						food_class: foodClass,
						price: 2,
						class: "food_b",
					})
				}
			}
		}
		if (values?.food_d?.length !== undefined) {
			for (let item of values?.food_d) {
				for (let foodClass of item?.food_class) {
					arr.push({
						food_type: item.food_type,
						food_class: foodClass,
						price: 2,
						class: "food_d",
					})
				}
			}
		}
		delete values.food_a;
		delete values.food_b;
		delete values.food_d;
		values.foods = arr;

		if (values.fdate.length !== 0) {
			for (let item of values.fdate) {
				date.push(dayjs(item).format('YYYY-MM-DD'))
			}
		}
		values.fdate = date;
		values.location = dataLocation;
		values = {
			...values,
			fromTime: dayjs(values['fromTime']).format("HH-MM"),
			toTime: dayjs(values['toTime']).format("HH-MM")
		}
		sendModifiedData(values);

	}

	// SEND EDIT DATA
	function sendModifiedData(data) {
		// setLoading(true);
		axios
			.put(`listing/${data.id}`, data)
			.then((res) => {
				if (res.status === 200) {
					// getOneListing(data.id);
					Swal.fire({
						title: "O`zgartirildi!",
						icon: "success",
					});

					console.log("res", res);
				} else {
					Swal.fire({
						title: "Ma`lumot O`zgartirilmadi!",
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


	const tagRender = (props) => {
		const { label, value, closable, onClose } = props;
		const onPreventMouseDown = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};
		return (
			<Tag
				color="#7e63ecea"
				onMouseDown={onPreventMouseDown}
				closable={closable}
				onClose={onClose}
				style={{
					margin: 4,
					fontSize: 14,
					letterSpacing: 1.5
				}}
			>
				{label}
			</Tag>
		);
	};


	const [notifications, setNotification] = useState(null);
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, code, message) => {
		api[type]({
			message: code,
			description: message,
			duration: 3,
		});
	};

	useEffect(() => {
		if (notifications) {
			openNotificationWithIcon(notifications.type, notifications.code, notifications.message);
		}
	}, [notifications]);



	//* загрузка главного изображения
	const oneImageProps = {
		method: "POST",
		name: "image",
		action: configs.uploadUrl,
		headers: {
			authorization: authHeader,
		},
		accept: "image/*",
		onChange({ file }) {
			if (file.response?.status === "success") {
				console.log("1", file.response);
				form.setFieldsValue({
					img: file.response.data.image,
				});
				setNotification({ type: "success", code: " Yuklandi", message: `${file.name}` });
			} else if (file.status === "error") {
				console.log("1", file.response);
				setNotification({ type: "error", code: " Yuklanmadi", message: `${file.name}` });
			}
		},

		progress: {
			strokeColor: {
				"0%": "#108ee9",
				"100%": "#87d068",
			},
			size: 3,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
	};
	const uploadButton = (
		<div style={{ width: "100%" }}>
			<CloudUploadOutlined />
			<p className="ant-upload-text">Format JPG, PNG, JPEG</p>
			<p className="ant-upload-hint">Rasimni tanlang</p>
		</div>
	);


	const propsGallery = {
		// method: "POST",
		// name: "image",
		// action: process.env.REACT_APP_IMAGE_UPLOAD_URL,
		// headers: {
		//   authorization: authHeader(),
		// },
		// multiple: true,

		// fileList,

		progress: {
			strokeColor: {
				"0%": "#108ee9",
				"100%": "#87d068",
			},
			size: 3,
			format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
	};
	function onChangeImageGallery({ fileList }) {
		if (fileList) {
			const img = fileList.map((file) => file.response?.data.image);
			if (fileList[0]?.response?.status === "success") {
				const listImageGallery = fileList.map((img) => img.response?.data?.image)
				if (listingOne[0]?.gallery.split(",").map(el => el.replace(/[\\\"\[\]]/g, ''))) {
					setImageList([...listingOne[0]?.gallery.split(",").map(el => el.replace(/[\\\"\[\]]/g, '')), ...listImageGallery]);
				} else {
					setImageList(listImageGallery);
				}
				setNotification({ type: "success", code: " Yuklandi", message: "" });
			} else if (fileList[0]?.status === "error") {
				setNotification({ type: "error", code: " Yuklanmadi", message: "" });
			}
		}
	}
	function onDeleteStorage(data) {
		const list = imageList.filter((i) => i !== data);
		setImageList(list)
	}

	useEffect(() => {
		form.setFieldsValue({
			gallery: imageList,
		});
		setImages(imageList)
	}, [form, imageList]);


	const value = {
		getListing,
		getOneListing,
		allListing,
		onDelete,
		addListing,
		setDataLocation,
		loading,
		listingOne,
		onEditListing,
		form,
		tagRender,
		oneImageProps,
		contextHolder,
		uploadButton,
		propsGallery,
		onChangeImageGallery,
		onDeleteStorage,
		image,
	};
	// console.clear();
	return (
		<AllListingContext.Provider value={value}>
			{children}
		</AllListingContext.Provider>
	);
}
