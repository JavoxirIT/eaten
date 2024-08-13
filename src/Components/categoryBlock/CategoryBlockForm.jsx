import React from 'react'
import { Button, Form, Input, Upload, } from 'antd'

const { Item } = Form;

export default function CategoryBlockForm({ onFinish, form }) {
	return (
		<Form onFinish={onFinish} form={form}>
			<Item name="id" hidden>
				<Input />
			</Item>
			<Item name="catname" >
				<Input placeholder='Nomi UZ' />
			</Item>
			<Item>
				<Button type="primary" htmlType="submit">
					Saqlash
				</Button>
			</Item>
		</Form>
	)
}
