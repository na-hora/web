import { useLoginUser } from '@/hooks/na-hora/user/use-login-user'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Row } from 'antd'
import { setCookie } from 'nookies'
import React, { useEffect } from 'react'

export const AdminLoginPage: React.FC = () => {
  const { mutate, isPending, data } = useLoginUser()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!data) {
      return
    }
    setCookie(null, 'access-token@na-hora', data?.token, {
      path: '/',
    })
    // window.location.href = '/admin/dashboard/home'
  }, [data])

  const loginUser = () => {
    form.validateFields().then((values) => {
      mutate({
        username: values.username,
        password: values.password,
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
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Lembrar de mim</Checkbox>
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
