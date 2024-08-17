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
}: Params) => {
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
      style={{ width: '100%', maxWidth: '600px' }}
      layout='vertical'
    >
      <Form.Item
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Nome do serviço
            <Tooltip title='Nome que será exibido para os clientes'>
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        }
        name='name'
        rules={[{ required: true, message: 'Nome obrigatório.' }]}
      >
        <Input placeholder='Digite aqui o nome do serviço' />
      </Form.Item>
      <Form.Item
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Atendimentos simultâneos
            <Tooltip title='Quantidade de atendimentos simultâneos que podem ser realizados do serviço.'>
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
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
        <Radio value={0} style={{ marginBottom: '16px' }}>
          Configuração única para todos os atendimentos
        </Radio>

        {configurationRadio === 0 && (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    Duração
                    <Tooltip title='Duração em minutos em média do atendimento.'>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </div>
                }
                name='duration'
              >
                <Input placeholder='Duração' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    Preço
                    <Tooltip title='Preço em reais em média do atendimento.'>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </div>
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
            <Row gutter={[16, 16]} key={`${size.label}-${hair.label}`}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label='Tamanho'
                  name={`${size.value}-${hair.value}-size`}
                  initialValue={size.label}
                >
                  <Select
                    options={sizes.map((s) => ({
                      label: s.label,
                      value: s.value,
                    }))}
                    value={size.label}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label='Pelagem'
                  name={`${size.value}-${hair.value}-hair`}
                  initialValue={hair.label}
                >
                  <Select
                    options={hairs.map((h) => ({
                      label: h.label,
                      value: h.value,
                    }))}
                    value={hair.label}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label='Duração'
                  name={`${size.value}-${hair.value}-duration`}
                >
                  <Input placeholder='Duração' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
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
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type='primary' htmlType='submit' style={{ marginTop: '16px' }}>
          {edition ? 'Salvar' : 'Criar'}
        </Button>
      </Form.Item>
    </Form>
  )
}
