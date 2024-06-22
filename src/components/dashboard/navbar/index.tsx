import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

export const NavbarDashboard = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="demo-logo"
        style={{ alignItems: "center", display: "flex" }}
      >
        <img src="/logo.svg" alt="" style={{ width: "50px" }} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items1}
        style={{ flex: 1, minWidth: 0, justifyContent: "center" }}
      />
      <button>Logout</button>
    </Header>
  );
};
