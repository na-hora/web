import { Result } from 'antd'
import { useRouteError } from 'react-router-dom'

export const GenericError = () => {
    const error = useRouteError()

  console.error(error)

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
        title={<h3>Ops...parece que algo deu errado &#129300;</h3>}
        style={{
          maxWidth: '500px',
        }}
        extra={
          <div>
            <p>
              Iremos verificar o que pode ter acontecido
            </p>
          </div>
        }
      />
    </div>
  )
}
