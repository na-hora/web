import { QuestionCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tooltip,
} from 'antd'
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

const sizes = [
  { value: 1, label: 'Pequeno' },
  { value: 2, label: 'Médio' },
  { value: 3, label: 'Grande' },
]

const hairs = [
  { value: 1, label: 'Curto' },
  { value: 2, label: 'Médio' },
  { value: 3, label: 'Longo' },
]

const sizeAndHairCombinations: {
  size: { value: number; label: string }
  hair: { value: number; label: string }
}[] = []
sizes.forEach((size) => {
  hairs.forEach((hair) => {
    sizeAndHairCombinations.push({
      size: { value: size.value, label: size.label },
      hair: { value: hair.value, label: hair.label },
    })
  })
})

export const ServicesForm = ({
  edition = false,
  id,
  name,
  parallelism,
}: // configurations = [],
Params) => {
  const [form] = Form.useForm()
  const [configurationRadio, setConfigurationRadio] = useState(0)

  const onChangeConfigurationRadio = (e: RadioChangeEvent) => {
    setConfigurationRadio(e.target.value)
  }

  return (
    <Form
      form={form}
      name={`service_${id}`}
      initialValues={{
        name: edition ? name : '',
        parallelism: edition ? parallelism : undefined,
      }}
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
        <Input placeholder='Digite aqui o nome do serviço' />
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
        />
      </Form.Item>

      <Radio.Group
        onChange={onChangeConfigurationRadio}
        value={configurationRadio}
      >
        <Radio value={0}>Configuração única para todos os atendimentos</Radio>

        {configurationRadio === 0 && (
          <Row gutter={16}>
            <Col span={12}>
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
                <Input placeholder='Duração' />
              </Form.Item>
            </Col>

            <Col span={12}>
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
                name='price'
              >
                <Input placeholder='Preço' />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Radio value={1}>Configuração detalhada por combinação</Radio>

        {configurationRadio === 1 &&
          sizeAndHairCombinations.map(({ size, hair }) => (
            <Row gutter={16} key={`${size.label}-${hair.label}`}>
              <Col span={6}>
                <Form.Item
                  label='Tamanho'
                  name={`${size.value}-${hair.value}-size`}
                  initialValue={size.label}
                >
                  <Select
                    options={sizes.map((s) => ({ label: s, value: s }))}
                    value={size.label}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label='Pelagem'
                  name={`${size.value}-${hair.value}-hair`}
                  initialValue={hair.label}
                >
                  <Select
                    options={hairs.map((s) => ({ label: s, value: s }))}
                    value={size.label}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label='Duração'
                  name={`${size.value}-${hair.value}-duration`}
                >
                  <Input placeholder='Duração' />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label='Preço'
                  name={`${size.value}-${hair.value}-price`}
                >
                  <Input placeholder='Preço' />
                </Form.Item>
              </Col>
            </Row>
          ))}
      </Radio.Group>

      <Form.Item style={{ textAlign: 'start' }}>
        <Button
          type='primary'
          htmlType='submit'
          className='create-service-form-button'
          style={{ marginTop: '16px' }}
        >
          {edition ? 'Salvar' : 'Criar'}
        </Button>
      </Form.Item>
    </Form>
  )
}
