import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Space, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from "axios";
import { SidebarMenu } from "../Components/Menu/SidebarMenu";
// import { useAllBooking } from "../Store/Booking/useAllBooking";
import { useAllListing } from "../Store/Listing/useAllListing";
import { useCitiesAndDistrict } from "../Store/CitiesAndDistricts/useCitiesAndDistrict";
import { OnSuspense } from "../Components/Suspense/OnSuspense";
import { useUnit } from "../Store/unit/useUnit";
import { configs } from "config/config";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
export default function AdminLayout() {

	const auth = useAuthUser()
	const authHeader = useAuthHeader();
	const signOut = useSignOut();
	const navigator = useNavigate()
	axios.defaults.baseURL = configs.apiURl;
	axios.defaults.headers.common["Authorization"] = authHeader;
	axios.defaults.headers.post["Content-Type"] = "application/json";

	//   const isAuthenticated = useIsAuthenticated();

	// const { getBooking } = useAllBooking();
	const { getListing } = useAllListing();
	const { getСities, getDistrict } = useCitiesAndDistrict();
	const { getUnit } = useUnit();
	useEffect(() => {
		// getBooking();
		getListing();
		getСities();
		getDistrict();
		getUnit();
	}, []);

	let [collapsed, setCollapsed] = useState(false);

	//   axios.interceptors.response.use(
	//     (response) => {
	//       return response;
	//     },
	//     (error) => {
	//       if (error === null) {
	//         message.error("Bunday Ma'lumotlar topilmadi");
	//       } else if (error.response.status === 401) {
	//         signOut();
	//       }
	//       return error;
	//     }
	//   );

	return (
		<Layout>
			<Header style={style.header} >
				<div style={style.blockLogo}>
					<span className="logo">EATEN</span>
				</div>
				<Space>
					<Tooltip placement="bottom" title={auth.lastname}>
						<Button><UserOutlined /></Button>
					</Tooltip>

					<Button
						onClick={() => { signOut(); navigator("/login") }}
						type={"primary"}
						// shape={"circle"}
						icon={<LogoutOutlined />}
						size={"small"}
						danger
					/>
				</Space>
			</Header>
			<Layout>
				<Sider
					width="12.5rem"
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}

				>
					<SidebarMenu />
				</Sider>

				<Content style={style.content}>
					<OnSuspense>
						<Outlet />
					</OnSuspense>
				</Content>
			</Layout>
		</Layout>
	);
}

const style = {
	header: {
		position: 'sticky',
		top: 0,
		zIndex: 5,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		display: "flex",
		justifyContent: "space-between"
	},
	blockLogo: {
		lineHeight: "0",
		display: "flex",
		alignItems: "center",
		gap: "0.625rem",
	},
	// logo: { fontSize: "1rem", color: "#ff9300" },
	layout: { padding: "0.625rem", backgroundColor: "#87cefa22" },
	content: { padding: "1.5rem", margin: 0, minHeight: "93vh" },
	siderStyle: {
		overflow: 'auto',
		height: '100vh',
		position: 'fixed',
		insetInlineStart: 0,
		top: 0,
		bottom: 0,
		scrollbarWidth: 'thin',
		scrollbarColor: 'unset',
	}
};
