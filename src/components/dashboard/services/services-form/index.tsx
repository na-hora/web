import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Tooltip } from 'antd'
import { useState } from 'react'

type Params = {
  id: number
  edition?: boolean
  name?: string
  parallelism?: number
  configurations?: {
    companyPetSizeId: number
    companyPetHairId: number
    value: number
    executionTime: number
  }[]
}

export const ServicesForm = ({
  edition = false,
  id,
  name,
  parallelism,
}: Params) => {
  const [form] = Form.useForm()
  const [activeCheckbox, setActiveCheckbox] = useState(-1)

  const toggleCheckbox = (current: number, checked: boolean) => {
    if (checked === true) {
      setActiveCheckbox(current)
    } else {
      setActiveCheckbox(-1)
    }
  }

  return (
    <Form
      form={form}
      name={`service_${id}`}
      initialValues={{ remember: true }}
      style={{ width: '100%', maxWidth: '500px' }}
      layout='vertical'
    >
      <Form.Item
        label={
          <Tooltip
            title='Nome que será exibido para os clientes'
            placement='right'
          >
            <div
              style={{
                width: '500px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Nome do serviço
              <QuestionCircleOutlined />
            </div>
          </Tooltip>
        }
        name='name'
        rules={[{ required: true, message: 'Nome obrigatório.' }]}
      >
        <Input
          placeholder='Digite aqui o nome do serviço'
          defaultValue={edition ? name : ''}
        />
      </Form.Item>
      <Form.Item
        label={
          <Tooltip
            title='Quantidade de atendimentos simultâneos que podem ser realizados do serviço.'
            placement='right'
          >
            <div
              style={{
                width: '500px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Atendimentos simultâneos
              <QuestionCircleOutlined />
            </div>
          </Tooltip>
        }
        name='parallelism'
        rules={[{ required: true, message: 'Simultaneidade obrigatória.' }]}
      >
        <Input
          type='number'
          placeholder='Digite aqui a simultaneidade do serviço'
          defaultValue={edition ? parallelism : undefined}
        />
      </Form.Item>

      <Checkbox
        onChange={({ target }) => {
          toggleCheckbox(0, target.checked)
        }}
        disabled={activeCheckbox !== 0 && activeCheckbox !== -1}
      >
        Configuração única para todos os atendimentos
      </Checkbox>

      <Checkbox
        onChange={({ target }) => {
          toggleCheckbox(1, target.checked)
        }}
        disabled={activeCheckbox !== 1 && activeCheckbox !== -1}
      >
        Configuração detalhada por combinação
      </Checkbox>

      <Form.Item style={{ textAlign: 'start' }}>
        <Button
          type='primary'
          htmlType='submit'
          className='create-service-form-button'
          style={{ marginTop: '16px' }}
          // loading={isPending}
          // onClick={loginUser}
        >
          {edition ? 'Salvar' : 'Criar'}
        </Button>
      </Form.Item>
    </Form>
  )
}
