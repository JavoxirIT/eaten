import {Button, Form, Input, Select} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {Upload, message} from 'antd';
import {UploadOutlined} from "@ant-design/icons";

export const AddEmployee = ({rend, setR}) => {
    let [roles, setRoles] = useState([]);
    let [userImg, setUserImg] = useState(process.env.REACT_APP_MAINURL + '/upload/user/defuser.png');
    useEffect(() => {
        axios.get('/roles').then(data => setRoles(data.data))
    }, []);
    console.log(userImg)
    const onFinish = (values) => {
        values.userimg = userImg
        console.log(values)
        axios.post('/users', values).then(data => {
                console.log(data)
                setR(!rend)
            }
        )
    }
    const onFinishFailed = (values) => {

    }
    const props = {
        name: 'image',
        action: process.env.REACT_APP_URL + '/file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file.response, info.fileList);
                // setUserImg(process.env.REACT_APP_MAINURL + info.file.response.data.image)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <>
            ` <Form
            name="basic"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <fieldset>
                <legend>Kirish ma'lumotlari</legend>
                <Form.Item label="Rasmni yuklash" name={'user_img'} valuePropName="user_img">
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Выбрать</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="FISH"
                    name="fish"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Parol"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="Bo'lim"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Select
                        options={roles.roles?.map(item => {
                            return {value: item.id, label: item.role}
                        })}
                    />
                </Form.Item>

            </fieldset>
            <fieldset>
                <legend>Xodim ma'lumotlari</legend>
                <Form.Item
                    label="Telefon"
                    name="tel"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Manzili"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Ma'lumoti"
                    name="malumot"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                value: "O'rta",
                                label: "O'rta"
                            },
                            {
                                value: "O'rta maxsus",
                                label: "O'rta maxsus"
                            },
                            {
                                value: "Oliy",
                                label: "Oliy"
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="JShShIR"
                    name="jshshir"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Karta ochilgan banki"
                    name="bank_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Bankni tanlang"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={roles.banks?.map(item => {
                            return {value: item.id, label: item.name}
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Plastik karta raqami"
                    name="card_no"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                {/*//   ``, ``, ``, `img`, ``, ``*/}
                <Form.Item
                    label="Tranzit Hisob raqami (Bankdan olinadi)"
                    name="transit_an"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Mexnat Shartnomasi raqami"
                    name="contract_no"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Mexnat shartnomasi tuzilgan sana"
                    name="contract_date"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </fieldset>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Saqlash
                </Button>
            </Form.Item>
        </Form>
        </>
    )
}
