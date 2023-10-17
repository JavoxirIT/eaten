import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import axios from "axios";
import { SidebarMenu } from "../Components/menu/SidebarMenu";
import { useAllBooking } from "../Store/Booking/useAllBooking";
import { useAllListing } from "../Store/Listing/useAllListing";
import { useCitiesAndDistrict } from "../Store/CitiesAndDistricts/useCitiesAndDistrict";
import { OnSuspense } from "../Components/suspense/OnSuspense";
import { useUnit } from "../Store/unit/useUnit";
import { configs } from "config/config";

export default function AdminLayout() {
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  axios.defaults.baseURL = configs.apiURl;
  axios.defaults.headers.common["Authorization"] = authHeader();
  axios.defaults.headers.post["Content-Type"] = "application/json";

  //   const isAuthenticated = useIsAuthenticated();

  const { getBooking } = useAllBooking();
  const { getListing } = useAllListing();
  const { getСities, getDistrict } = useCitiesAndDistrict();
  const { getUnit } = useUnit();
  useEffect(() => {
    getBooking();
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
      <Header style={style.header}>
        <div style={style.blockLogo}>
          <span style={style.logo}>EATEN</span>
        </div>
        <Space>
          <Button
            type={"primary"}
            shape={"circle"}
            icon={<UserOutlined />}
            size={"small"}
          />
          <Button
            onClick={() => signOut()}
            type={"primary"}
            shape={"circle"}
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "0.625rem",
    // backgroundColor: '#23334f'
  },
  blockLogo: {
    lineHeight: "0",
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
  },
  logo: { fontSize: "1rem", color: "#ff9300" },
  layout: { padding: "0.625rem", backgroundColor: "#87cefa22" },
  content: { padding: "1.5rem", margin: 0, minHeight: "93vh" },
};
