import {
  BarsOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  {
    key: '1',
    icon: <CalendarOutlined />,
    label: 'Agenda',
    link: 'appointments',
  },
  { key: '2', icon: <BarsOutlined />, label: 'Cadastros', link: 'registers' },
  { key: '3', icon: <ClockCircleOutlined />, label: 'Horários', link: 'hours' },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Meu usuário',
    link: 'profile',
  },
]

const menuItems = items.map((item) => ({
  key: item.key,
  icon: item.icon,
  label: <Link to={item.link}>{item.label}</Link>,
}))

export const Sidebar = () => {
  const MapOptions: Record<string, string> = {
    '/admin/dashboard/appointments': '1',
    '/admin/dashboard/registers': '2',
    '/admin/dashboard/hours': '3',
    '/admin/dashboard/profile': '4',
  }

  const currentPage = window.location.pathname
  const defaultSelectKey = MapOptions[currentPage]

  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className='demo-logo-vertical' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[defaultSelectKey]}
        items={menuItems}
      />
    </Sider>
  )
}
