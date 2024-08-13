import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { configs } from 'config/config'
import { CategoryBlock } from 'context/Context'
import { ERROR, ERROR_DELETE_FETCH, ERROR_FETCH, ERROR_POST_FETCH, ERROR_UPDATE_FETCH } from 'tools/const'
import { useForm } from 'antd/es/form/Form'

export default function CategoryBlockState({ children }) {
	const [dataCategoryBlock, setDataCategoryBlock] = useState([]);
	const [loading, setLoading] = useState(false);
	const [form] = useForm();

	async function getCategoryBlock() {
		setLoading(true)
		try {
			const response = await axios.get(`${configs.apiURl}bcat`);
			if (response.status === 200) {
				setDataCategoryBlock(await response.data);
			} else {
				Swal.fire({ title: ERROR_FETCH, icon: "warning" })
			}
		} catch (e) {
			Swal.fire({ title: ERROR, icon: "error" })
		} finally { setLoading(false) }
	}

	async function postCategoryBlock(data) {
		setLoading(true)
		try {
			const response = await axios.post(`${configs.apiURl}bcat`, data);
			if (response.status === 200) {
				getCategoryBlock()
			} else {
				Swal.fire({ title: ERROR_POST_FETCH, icon: "warning" })
			}
		} catch (e) {
			Swal.fire({ title: ERROR, icon: "error" })
		} finally { setLoading(false) }
	}

	async function putCategoryBlock(data) {
		setLoading(true)
		try {
			const response = await axios.put(`${configs.apiURl}bcat/${data.id}`, data);
			if (response.status === 200) {
				setDataCategoryBlock([...dataCategoryBlock.filter(el => el.id !== data.id), data])
			} else {
				Swal.fire({ title: ERROR_UPDATE_FETCH, icon: "warning" })
			}
		} catch (e) {
			Swal.fire({ title: ERROR, icon: "error" })
		} finally { setLoading(false) }
	}

	async function deleteCategoryBlock(_, data) {
		setLoading(true)
		try {
			const response = await axios.delete(`${configs.apiURl}bcat/${data.id}`);
			if (response.status === 200) {
				setDataCategoryBlock(dataCategoryBlock.filter(el => el.id !== data.id))
			} else {
				Swal.fire({ title: ERROR_DELETE_FETCH, icon: "warning" })
			}
		} catch (e) {
			Swal.fire({ title: ERROR, icon: "error" })
		} finally { setLoading(false) }
	}



	const value = { getCategoryBlock, postCategoryBlock, putCategoryBlock, deleteCategoryBlock, loading, dataCategoryBlock, form }

	return (
		<CategoryBlock.Provider value={value}>{children}</CategoryBlock.Provider>
	)
}
