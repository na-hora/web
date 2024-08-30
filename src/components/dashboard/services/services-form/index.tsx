import { useCreatePetServices } from '@/hooks/na-hora/pet-services/use-create-pet-services'
import { useLoadPetServiceDetails } from '@/hooks/na-hora/pet-services/use-load-pet-service-details'
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
import { useEffect, useState } from 'react'

type Params = {
  id: number
  edition?: boolean
  name?: string
}

const ServicesForm = ({ edition = false, id, name }: Params) => {
  const [form] = Form.useForm()
  const [configurationRadio, setConfigurationRadio] = useState(0)
  const { mutate: createPetServiceMutation } = useCreatePetServices()
  const { petHairs, petSizes }: UseLoginUserResult['company'] = JSON.parse(
    parseCookies()['inf@na-hora'],
  )
  const { data: petServiceDetailed } = useLoadPetServiceDetails(id)

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

  const formatSimpleConfigurations = (serviceDetails: any) => {
    serviceDetails.configurations = []

    for (const sizeAndHair of sizeAndHairCombinations) {
      serviceDetails.configurations?.push({
        price: parseFloat(Number(serviceDetails.price).toFixed(2)),
        executionTime: Number(serviceDetails.executionTime),
        companyPetSizeID: sizeAndHair.size.value,
        companyPetHairID: sizeAndHair.hair.value,
      })
    }

    delete serviceDetails.executionTime
    delete serviceDetails.price

    return {
      name: serviceDetails.name,
      paralellism: Number(serviceDetails.paralellism),
      configurations: serviceDetails.configurations,
    }
  }

  const formatDetailedConfigurations = (serviceDetails: any) => {
    const treatedData: any[] = []

    const currentObjectTreated = {
      companyPetHairID: 0,
      companyPetSizeID: 0,
      executionTime: 0,
      price: 0,
    }

    Object.entries(serviceDetails).forEach(([key, value]) => {
      if (key.includes('hair')) {
        currentObjectTreated['companyPetHairID'] = Number(value)
      }
      if (key.includes('size')) {
        currentObjectTreated['companyPetSizeID'] = Number(value)
      }
      if (key.includes('executionTime')) {
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

    return {
      name: serviceDetails.name,
      paralellism: Number(serviceDetails.paralellism),
      configurations: treatedData,
    }
  }

  const savePetService = (serviceDetails: any) => {
    let formattedPetService: any
    const uniqueConfiguration =
      serviceDetails.executionTime && serviceDetails.price

    if (uniqueConfiguration) {
      formattedPetService = formatSimpleConfigurations(serviceDetails)
    } else {
      formattedPetService = formatDetailedConfigurations(serviceDetails)
    }

    createPetServiceMutation({ body: formattedPetService })

    form.resetFields()
  }

  const onChangeConfigurationRadio = (e: RadioChangeEvent) => {
    setConfigurationRadio(e.target.value)
  }

  const uniqueConfigurationForAllServices = configurationRadio === 0
  const detailedConfigurationForAllServices = configurationRadio === 1

  useEffect(() => {
    if (edition && petServiceDetailed) {
      form.setFieldsValue({
        name: petServiceDetailed.name,
        paralellism: petServiceDetailed.paralellism,
      })

      const configurations = petServiceDetailed.configurations
      const allSamePrice = configurations.every(
        (config) => config.price === configurations[0].price,
      )
      const allSameExecutionTime = configurations.every(
        (config) => config.executionTime === configurations[0].executionTime,
      )

      if (allSamePrice && allSameExecutionTime) {
        setConfigurationRadio(0)
        form.setFieldsValue({
          configurationType: 0,
          price: configurations[0].price,
          executionTime: configurations[0].executionTime,
        })
      } else {
        setConfigurationRadio(1)

        form.setFieldsValue({
          configurationType: 1,
        })
        configurations.forEach((config) => {
          form.setFieldsValue({
            [`${config.companyPetSizeId}-${config.companyPetHairId}-price`]:
              config.price,
            [`${config.companyPetSizeId}-${config.companyPetHairId}-executionTime`]:
              config.executionTime,
          })
        })
      }
    }
  }, [edition, petServiceDetailed, form])

  return (
    <Form
      form={form}
      name={`service_${id}`}
      initialValues={{
        name: edition ? name : '',
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
        name='paralellism'
        rules={[
          { required: true, message: 'Atendimentos simultâneos obrigatórios.' },
        ]}
      >
        <Input
          type='number'
          placeholder='Digite aqui a quantidade de atendimentos simultâneos.'
        />
      </Form.Item>

      <Form.Item
        name='configurationType'
        label='Tipo de Configuração'
        style={{
          textAlign: 'left',
        }}
      >
        <Radio.Group
          onChange={onChangeConfigurationRadio}
          value={configurationRadio}
        >
          <Radio value={0} style={{ marginBottom: '16px' }}>
            Configuração única para todos os atendimentos
          </Radio>

          {uniqueConfigurationForAllServices && (
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Duração
                      <Tooltip title='Duração em minutos em média do atendimento.'>
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </div>
                  }
                  name='executionTime'
                  rules={[{ required: true, message: 'Duração obrigatória.' }]}
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
                  rules={[{ required: true, message: 'Preço obrigatório.' }]}
                >
                  <Input placeholder='Preço' />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Radio value={1}>Configuração detalhada por combinação</Radio>

          {detailedConfigurationForAllServices &&
            sizeAndHairCombinations.map(({ size, hair }) => (
              <Row gutter={[16, 16]} key={`${size.label}-${hair.label}`}>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label='Tamanho'
                    name={`${size.value}-${hair.value}-size`}
                    initialValue={size.value}
                    rules={[
                      { required: true, message: 'Tamanho obrigatório.' },
                    ]}
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
                    rules={[
                      { required: true, message: 'Pelagem obrigatória.' },
                    ]}
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
                    name={`${size.value}-${hair.value}-executionTime`}
                    rules={[
                      { required: true, message: 'Duração obrigatória.' },
                    ]}
                  >
                    <Input placeholder='Duração' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label='Preço'
                    name={`${size.value}-${hair.value}-price`}
                    rules={[{ required: true, message: 'Preço obrigatório.' }]}
                  >
                    <Input placeholder='Preço' />
                  </Form.Item>
                </Col>
              </Row>
            ))}
        </Radio.Group>
      </Form.Item>
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

export default ServicesForm
