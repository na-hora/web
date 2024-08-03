import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio, RadioChangeEvent, Tooltip } from 'antd'
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
  const [configurationRadio, setConfigurationRadio] = useState(0)

  const onChangeConfigurationRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setConfigurationRadio(e.target.value)
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

      <Radio.Group
        onChange={onChangeConfigurationRadio}
        value={configurationRadio}
      >
        <Radio value={0}>Configuração única para todos os atendimentos</Radio>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Form.Item
            label={
              <Tooltip
                title='Duração em minutos em média do atendimento.'
                placement='right'
              >
                <div
                  style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Duração
                  <QuestionCircleOutlined />
                </div>
              </Tooltip>
            }
            name='duration'
          >
            <Input placeholder='Duração' disabled={configurationRadio !== 0} />
          </Form.Item>

          <Form.Item
            label={
              <Tooltip
                title='Preço em reais em média do atendimento (Este valor será exibido para os clientes como uma estimativa).'
                placement='right'
              >
                <div
                  style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Preço
                  <QuestionCircleOutlined />
                </div>
              </Tooltip>
            }
            name='duration'
          >
            <Input
              placeholder='Preço em reais'
              disabled={configurationRadio !== 0}
            />
          </Form.Item>
        </div>

        <Radio value={1}>Configuração detalhada por combinação</Radio>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Form.Item
            label={
              <Tooltip
                title='Duração em minutos em média do atendimento.'
                placement='right'
              >
                <div
                  style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Duração
                  <QuestionCircleOutlined />
                </div>
              </Tooltip>
            }
            name='duration'
          >
            <Input placeholder='Duração' disabled={configurationRadio !== 1} />
          </Form.Item>

          <Form.Item
            label={
              <Tooltip
                title='Preço em reais em média do atendimento (Este valor será exibido para os clientes como uma estimativa).'
                placement='right'
              >
                <div
                  style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Preço
                  <QuestionCircleOutlined />
                </div>
              </Tooltip>
            }
            name='duration'
          >
            <Input
              placeholder='Preço em reais'
              disabled={configurationRadio !== 1}
            />
          </Form.Item>
        </div>
      </Radio.Group>

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
