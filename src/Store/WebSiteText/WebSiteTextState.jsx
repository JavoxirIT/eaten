import React, { useState } from "react";
import { WebSiteText } from "context/Context";
import axios from "axios";
import Redirect from "tools/redirect";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { TRANSLATION_NOT_UPDATED, TRANSLATION_UPDATED } from "tools/const";

export default function WebSiteTextState({ children }) {
	const [translateText, setTranslateText] = useState([]);
	const [loading, setLoading] = useState(false);

	const [form] = useForm();

	function getDataText() {
		setLoading(true);
		axios
			.get("translate")
			.then((response) => {
				if (response.status === 200) {
					setTranslateText(response.data);
				}
				// console.log(response);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}

	function editDataText(value) {
		setLoading(true);
		axios
			.put("translate/" + value.key, value)
			.then((response) => {
				if (response.status === 200) {
					Swal.fire({
						title: TRANSLATION_UPDATED,
						icon: "success",
					});
				} else {
					Swal.fire({
						title: TRANSLATION_NOT_UPDATED,
						icon: "error",
					});
				}
			})
			.catch(() => Redirect("/login"))
			.finally(() => setLoading(false));
	}

	return (
		<WebSiteText.Provider
			value={{ loading, translateText, getDataText, editDataText, form }}
		>
			{children}
		</WebSiteText.Provider>
	);
}
