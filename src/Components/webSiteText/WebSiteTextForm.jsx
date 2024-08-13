import React, { useEffect, useState } from "react";
import { Input, Form, Button, Row, Divider, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";

const { Item } = Form;
const { TextArea } = Input;

export default function WebSiteTextForm({ onFinish, form }) {


	return (
		<Form onFinish={onFinish} form={form}>
			<Item name="id" hidden={true}>
				<Input />
			</Item>
			<Item name="nameuz" label="Nomi UZ">
				<TextArea />
			</Item>
			<Item name="nameru" label="Nomi RU">
				<TextArea />
			</Item>
			<Item name="nameen" label="Nomi EN">
				<TextArea />
			</Item>
			<Row justify="end">
				<Item>
					<Button type="primary" danger htmlType="submit">
						Saqlash
					</Button>
				</Item>
			</Row>
		</Form>
	)
}
