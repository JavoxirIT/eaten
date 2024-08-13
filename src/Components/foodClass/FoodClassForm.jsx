import React from 'react'
import { Button, Form, Input, Upload, } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const { Item } = Form;
const { TextArea } = Input;

export default function FoodClassForm({ onFinish, form, imageProps }) {
	return (
		<Form onFinish={onFinish} form={form}>
			<Item name="id" hidden>
				<Input />
			</Item>
			<Item name="nameuz" >
				<Input placeholder='Nomi UZ' />
			</Item>
			<Item name="nameru" >
				<Input placeholder='Nomi RU' />
			</Item>
			<Item name="nameen" >
				<Input placeholder='Nomi EN' />
			</Item>
			<Item name="descriptionuz" >
				<TextArea placeholder='Ma`lumot EN' />
			</Item>
			<Item name="descriptionru" >
				<TextArea placeholder='Ma`lumot EN' />
			</Item>
			<Item name="descriptionen" >
				<TextArea placeholder='Ma`lumot EN' />
			</Item>
			<Item label="Rasm" name="img" valuePropName="file">
				<Upload {...imageProps}>
					<Button type="primary" danger icon={<UploadOutlined />}>
						Rasmni yuklash
					</Button>
				</Upload>
			</Item>
			<Item>
				<Button type="primary" htmlType="submit">
					Saqlash
				</Button>
			</Item>
		</Form>
	)
}
