import { useLoginUser } from '@/hooks/na-hora/user/use-login-user'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Row } from 'antd'
import { parseCookies, setCookie } from 'nookies'
import React, { useEffect, useState } from 'react'

export const AdminLoginPage: React.FC = () => {
  const { mutate: loginUserMutation, isPending, data } = useLoginUser()
  const [rememberMe, setRememberMe] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const accessCookie = parseCookies()['access-token@na-hora']

    if (accessCookie) {
      window.location.href = '/admin/dashboard/home'
    }
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    setCookie(null, 'access-token@na-hora', data?.token, {
      path: '/',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : null,
    })
    setCookie(null, 'inf@na-hora', JSON.stringify(data?.company), {
      path: '/',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : null,
    })

    window.location.href = '/admin/dashboard/appointments'
  }, [data])

  const loginUser = () => {
    form.validateFields().then((values) => {
      loginUserMutation({
        body: {
          username: values.username,
          password: values.password,
        },
      })
    })
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src='/logo.svg' alt='na hora' style={{ width: '150px' }} />
        <h1>Na Hora</h1>
        <p>Faça aqui seu login no painel de controle.</p>
      </div>

      <Form
        form={form}
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'E-mail obrigatório.' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Digite aqui o seu e-mail'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Senha obrigatória.' }]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Digite aqui a sua senha'
          />
        </Form.Item>
        <Row justify='space-between' align='middle'>
          <Form.Item name='remember' noStyle>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Lembrar de mim
            </Checkbox>
          </Form.Item>
          <a className='login-form-forgot' href='/admin/forgot-password'>
            Esqueci minha senha
          </a>
        </Row>

        <Form.Item style={{ textAlign: 'end' }}>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            style={{ marginTop: '16px' }}
            loading={isPending}
            onClick={loginUser}
          >
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
