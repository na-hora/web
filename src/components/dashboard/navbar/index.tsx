import { Menu, MenuProps } from "antd"
import { Header } from "antd/es/layout/layout"

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}))

export const NavbarDashboard = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="demo-logo" style={{ color: "#fff" }}>
        Logo Na hora
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
  )
}
