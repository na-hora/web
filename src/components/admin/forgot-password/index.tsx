import { useForgotPasswordUser } from '@/hooks/na-hora/user/use-forgot-password-user'
import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const AdminForgotPasswordPage: React.FC = () => {
  const {
    mutate: forgotPasswordUserMutation,
    isPending,
    isSuccess,
  } = useForgotPasswordUser()
  const [form] = Form.useForm()
  const [showWaitMessage, setShowWaitMessage] = useState(false)

  const forgotPassUser = () => {
    form.validateFields().then((values) => {
      forgotPasswordUserMutation({
        body: {
          email: values.email,
        },
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
            Um e-mail de redefinição de senha foi enviado para o seu e-mail.
            Verifique sua caixa de entrada.
          </p>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src='/logo.svg' alt='na hora' style={{ width: '150px' }} />
            <h1>Na Hora</h1>
            <p>
              Esqueceu sua senha? Não se preocupe, enviaremos um e-mail para
              redefinir sua senha.
            </p>
          </div>
          <Form form={form} initialValues={{ remember: true }}>
            <Form.Item
              name='email'
              rules={[{ required: true, message: 'E-mail obrigatório.' }]}
              required
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Digite aqui o seu e-mail'
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'end' }}>
              <Button
                type='primary'
                htmlType='submit'
                className='forgot-password-form-button'
                loading={isPending}
                onClick={forgotPassUser}
              >
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </main>
  )
}
