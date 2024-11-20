import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'

export const Home = () => {
  return (
    <>
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
        <Button
          type='primary'
          onClick={() => (window.location.href = '/admin/login')}
        >
          Painel administrador
        </Button>
      </Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Bem-vindo ao Na Hora!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Agende o melhor cuidado para o seu pet de forma simples e rápida.
        </p>
        <Button
          type='primary'
          size='large'
          onClick={() => (window.location.href = '/appointment/new')}
        >
          Agendar horário
        </Button>
      </div>
    </>
  )
}
