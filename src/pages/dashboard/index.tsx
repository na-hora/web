import { NavbarDashboard } from '@/components/dashboard/navbar'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import { DashboardProvider } from './contexts/dashboard-provider'

export const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <DashboardProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <NavbarDashboard />
        <Layout>
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 20,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </DashboardProvider>
  )
}
