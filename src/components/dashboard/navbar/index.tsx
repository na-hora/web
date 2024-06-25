import { Button, Popconfirm } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { destroyCookie } from 'nookies'

export const NavbarDashboard = () => {
  const companyDashboardLogout = () => {
    destroyCookie(null, 'access-token@na-hora', { path: '/' })
  }

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        className='demo-logo'
        style={{ alignItems: 'center', display: 'flex' }}
      >
        <img src='/logo.svg' alt='' style={{ width: '50px' }} />
      </div>
      <h2 style={{ color: '#ffffff98' }}>Na Hora</h2>
      <Popconfirm
        title='Tem certeza que deseja sair?'
        okText='Sim'
        cancelText='Não'
        onConfirm={companyDashboardLogout}
      >
        <Button type='primary'>Sair</Button>
      </Popconfirm>
    </Header>
  )
}
