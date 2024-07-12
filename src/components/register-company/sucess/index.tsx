import { Button, Result } from 'antd'

export const SuccessCompanyRegister = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result
        icon={<img src='/logo.svg' alt='' style={{ width: '150px' }} />}
        title={<h3>Parabéns! Seu cadastro foi concluído com sucesso!</h3>}
        style={{
          maxWidth: '500px',
        }}
        extra={
          <div>
            <p>
              Enviamos um e-mail com um link de acesso para o portal. Ou, se
              preferir, clique no botão abaixo.
            </p>
            <Button type='primary' key='console' href='/admin/login'>
              Ir para o painel
            </Button>
          </div>
        }
      />
    </div>
  )
}
