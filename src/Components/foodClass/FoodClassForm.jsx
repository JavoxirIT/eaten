import React from 'react'
import { Button, Form, Input, Space, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Item } = Form;
const { TextArea } = Input

export default function FoodClassForm({ form, onFinish, uploadProps }) {
	return <Form onFinish={onFinish} form={form} >
		<Item name="nameuz" >
			<Input placeholder='Nomi UZ' />
		</Item>
		<Item name="nameru"  >
			<Input placeholder='Nomi RU' />
		</Item>
		<Item name="nameen" >
			<Input placeholder='Nomi EN' />
		</Item>
		<Item name="descriptionuz" >
			<TextArea />
		</Item>
		<Item name="descriptionru" >
			<TextArea />
		</Item>
		<Item name="descriptionen" >
			<TextArea />
		</Item>
		<Item label="Rasm" name="img" valuePropName="file">
			<Upload {...uploadProps}>
				<Button type="primary" danger icon={<UploadOutlined />}>
					Rasmni yuklash
				</Button>
			</Upload>
		</Item>
		<Item>
			<Space>
				<Button htmlType='submit' type='primary' >Saqlash</Button>
				<Button htmlType='reset' type='primary' danger >Tozalash</Button>
			</Space>
		</Item>
	</Form>
}