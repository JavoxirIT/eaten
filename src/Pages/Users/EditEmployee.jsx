import {Button, Form, Input, Select} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

export const EditEmployee = ({rend, setR, editData}) => {
    let [roles, setRoles] = useState([]);
    useEffect(() => {
        axios.get('/roles').then(data => setRoles(data.data))
    }, []);
    const onFinish = (values) => {
        console.log(values)
        axios.post('/usersupd/' + values.id, values).then(data => {
                console.log(data)
                setR(!rend)
            }
        )
    }
    const onFinishFailed = (values) => {

    }
    let [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(editData)
    }, [editData]);


    return (
        <>
            <Form
            form={form}
            name="editemployer"
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
                    label="Index"
                    name="id"
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
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Bo'lim"
                    name="role_id"
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
                    <Input/>
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
                    <Input type={'date'}/>
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