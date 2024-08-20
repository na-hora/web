import { UseLoginUserResult } from '@/hooks/na-hora/user/use-login-user'
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
import { parseCookies } from 'nookies'
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

const { petHairs, petSizes }: UseLoginUserResult['company'] = JSON.parse(
  parseCookies()['inf@na-hora'],
)

const sizeAndHairCombinations: {
  size: { value: number; label: string }
  hair: { value: number; label: string }
}[] = []
petSizes.forEach((size: { id: number; name: string }) => {
  petHairs.forEach((hair: { id: number; name: string }) => {
    sizeAndHairCombinations.push({
      size: { value: size.id, label: size.name },
      hair: { value: hair.id, label: hair.name },
    })
  })
})

const savePetService = (data: any) => {
  const treatedData = []

  const currentObjectTreated = {
    companyPetHairID: 0,
    companyPetSizeID: 0,
    executionTime: 0,
    price: 0,
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key.includes('hair')) {
      currentObjectTreated['companyPetHairID'] = Number(value)
    }
    if (key.includes('size')) {
      currentObjectTreated['companyPetSizeID'] = Number(value)
    }
    if (key.includes('duration')) {
      currentObjectTreated['executionTime'] = Number(value)
    }
    if (key.includes('price')) {
      currentObjectTreated['price'] = Number(value)
    }

    if (
      currentObjectTreated['companyPetHairID'] !== 0 &&
      currentObjectTreated['companyPetSizeID'] !== 0 &&
      currentObjectTreated['executionTime'] !== 0 &&
      currentObjectTreated['price'] !== 0
    ) {
      treatedData.push({ ...currentObjectTreated })
      currentObjectTreated['companyPetHairID'] = 0
      currentObjectTreated['companyPetSizeID'] = 0
      currentObjectTreated['executionTime'] = 0
      currentObjectTreated['price'] = 0
    }
  })
  // console.log({ treatedData })
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
      onFinish={savePetService}
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
            <Col xs={24} sm={12} md={6}>
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
                  initialValue={size.value}
                >
                  <Select
                    options={petSizes.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    value={size.value}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label='Pelagem'
                  name={`${size.value}-${hair.value}-hair`}
                  initialValue={hair.value}
                >
                  <Select
                    options={petHairs.map((h) => ({
                      value: h.id,
                      label: h.name,
                    }))}
                    value={hair.value}
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
        <Button
          type='primary'
          htmlType='submit'
          style={{ marginTop: '16px' }}
          // onClick={savePetService}
        >
          {edition ? 'Salvar' : 'Criar'}
        </Button>
      </Form.Item>
    </Form>
  )
}
