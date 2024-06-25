import { useResetPasswordUser } from '@/hooks/na-hora/user/use-reset-password-user'
import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const AdminResetPasswordPage: React.FC = () => {
  const { mutate, isPending, isSuccess } = useResetPasswordUser()
  const [form] = Form.useForm()
  const [showWaitMessage, setShowWaitMessage] = useState(false)
  const searchParams = new URLSearchParams(window.location.search)
  const validator = searchParams.get('validator')
  const email = searchParams.get('email')

  const forgotPassUser = () => {
    if (!email || !validator) {
      alert('Email ou validador ausente') // tratar erro
      return
    }

    form.validateFields().then((values) => {
      mutate({
        email,
        password: values.password,
        validator,
      })
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setShowWaitMessage(true)
    }
  }, [isSuccess])

  return (
    <main className={styles.main}>
      {showWaitMessage ? (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px' }}>
          <img src='/logo.svg' alt='na hora' style={{ width: '150px' }} />
          <h1>Na Hora</h1>
          <p style={{ textAlign: 'center' }}>
            Perfeito! Sua senha foi redefinida. Clique no botão abaixo para
            fazer o login com a nova senha.
          </p>
          <Button
            type='primary'
            className='go-to-login-form-button'
            style={{ textDecoration: 'none' }}
            href='/admin/login'
          >
            Ir para o login
          </Button>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src='/logo.svg' alt='na hora' style={{ width: '150px' }} />
            <h1>Na Hora</h1>
            <p>Escolha a sua nova senha para acessar o painel.</p>
          </div>
          <Form form={form} initialValues={{ remember: true }}>
            <Form.Item
              name='password'
              hasFeedback
              rules={[
                { required: true, message: 'Senha obrigatória.' },
                {
                  min: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres!',
                },
              ]}
              required
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Digite aqui o sua nova senha.'
              />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              hasFeedback
              rules={[
                { required: true, message: 'Confirme sua senha' },
                {
                  validator: (_, value) => {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject('As senhas precisam ser iguais')
                    }
                    return Promise.resolve()
                  },
                },
              ]}
              required
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Confirme sua senha'
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'end' }}>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                style={{ marginTop: '20px' }}
                loading={isPending}
                onClick={forgotPassUser}
              >
                Redefinir
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </main>
  )
}
