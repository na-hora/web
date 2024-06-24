import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'

export const NavbarDashboard = () => {
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
      <Button type='primary'>Login</Button>
    </Header>
  )
}
