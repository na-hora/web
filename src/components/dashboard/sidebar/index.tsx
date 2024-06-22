import {
  AppstoreOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  { key: "1", icon: <AppstoreOutlined />, label: "Home", link: "home" },
  { key: "2", icon: <ProfileOutlined />, label: "Empresa", link: "company" },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Meu usuário",
    link: "profile",
  },
];

const menuItems = items.map((item) => ({
  key: item.key,
  icon: item.icon,
  label: <Link to={item.link}>{item.label}</Link>,
}));

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
      />
    </Sider>
  );
};
