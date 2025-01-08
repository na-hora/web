import { Button, Popconfirm } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { destroyCookie, parseCookies } from 'nookies'

export const NavbarDashboard = () => {
  const companyCookie = parseCookies()['inf@na-hora']
  const { fantasyName: companyName } = JSON.parse(companyCookie)
  const companyDashboardLogout = () => {
    destroyCookie(null, 'access-token@na-hora', { path: '/' })
    destroyCookie(null, 'inf@na-hora', { path: '/' })

    window.location.href = '/admin/login'
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
      <h2 style={{ color: '#fff' }}>{companyName}</h2>
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
