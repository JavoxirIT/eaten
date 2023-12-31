import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  ProjectFilled,
} from "@ant-design/icons";
import { BsReception3 } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";

export function SidebarMenu() {
  return (
	  <Menu
		  
      theme="light"
      mode="inline"
      //   defaultSelectedKeys={["1"]}
      //   defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        borderRight: 0,
      }}
      items={[
        {
          key: "home",
          icon: <HomeOutlined />,
          label: <NavLink to="/">Home</NavLink>,
        },
        {
          key: "users",
          icon: <UserOutlined />,
          label: <NavLink to="users">Foydalanuvchilar</NavLink>,
        },
        {
          key: "userVender",
          icon: <UserOutlined />,
          label: <NavLink to="userVender">Xizmat Ko`rsatuvchilar</NavLink>,
        },
        {
          key: "booking",
          icon: <FaChalkboardTeacher />,
          label: <NavLink to="booking">Bron qilingallar</NavLink>,
        },
        {
          key: "listing",
          icon: <FaChalkboardTeacher />,
          label: <NavLink to="all-listing">E'lon</NavLink>,
        },
        {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Sozlamalar",
          children: [
            {
              key: "priority",
              icon: <ProjectFilled />,
              label: <NavLink to="priority">Ustunlik</NavLink>,
            },
            {
              key: "listingStatus",
              icon: <ProjectFilled />,
              label: <NavLink to="listingStatus">Buyurtmalar holati</NavLink>,
            },
            {
              key: "listingType",
              icon: <ProjectFilled />,
              label: <NavLink to="listingType">Buyurtmalar Turlari</NavLink>,
            },
            {
              key: "unitList",
              icon: <ProjectFilled />,
              label: <NavLink to="unitList">O`lchov birliklari</NavLink>,
            },
            {
              key: "foodType",
              icon: <ProjectFilled />,
              label: <NavLink to="foodType">Ovqatlar Turi</NavLink>,
            },
            {
              key: "category",
              icon: <ProjectFilled />,
              label: <NavLink to="category">Toifalar</NavLink>,
            },
            {
              key: "convenience",
              icon: <ProjectFilled />,
              label: <NavLink to="convenience">Qulayliklar</NavLink>,
            },
          ],
        },
      ]}
    />
  );
}
