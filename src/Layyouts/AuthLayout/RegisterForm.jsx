import {Form, Input, message} from "antd";
import {useState} from "react";
import axios from "axios";
import {useAuthHeader} from "react-auth-kit";

const {Item} = Form

export const RegisterForm = ({tab}) => {
	const [current, setCurrent] = useState(0);
	const authHeader = useAuthHeader()
	axios.defaults.baseURL = process.env.REACT_APP_URL;
	axios.defaults.headers.common['Authorization'] = authHeader();
	axios.defaults.headers.post['Content-Type'] = 'application/json';


	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};

	const onFinish = (values) => {
		console.log(values)
		axios.post('/register', values).then(data => {
			message.success("Ro'yxatdan o'tdingiz. Iltimos Login parolni terib tizimga kiring")
			tab('1')
		})
	}

	return (
		<>
			<Form
				name="register"
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

			>
				<Item label="Login" name="login">
					<Input placeholder="Login"/>
				</Item>
				<Item label="Parol" name="password">
					<Input.Password placeholder="Parol"/>
				</Item>
				<Item label="Email" name="email" rules={[
					{
						require: true,
						type:"email"
					}
				]}>
					<Input placeholder="Email"/>
				</Item>
			</Form>
		</>
	)
}