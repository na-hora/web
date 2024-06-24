import { Button, Result } from 'antd'

export const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Result
        icon={<img src='/logo.svg' alt='' style={{ width: '150px' }} />}
        title={<h3>Opss... Esta página não foi encontrada</h3>}
        style={{
          maxWidth: '500px',
        }}
        extra={
          <div>
            <p>
              Você pode retornar para a tela inicial ou entrar em contato com o
              nosso suporte.
            </p>
            <Button type='primary' key='console' href='/'>
              Início
            </Button>
          </div>
        }
      />
    </div>
  )
}
