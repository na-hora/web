import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetService } from '@/hooks/na-hora/pet-services/types/list.type'
import { useRelatePetServiceConfiguration } from '@/hooks/na-hora/pet-services/use-relate-pet-service-configuration'
import { useLoadPetTypeCombinations } from '@/hooks/na-hora/pet-type-combinations/use-load-pet-type-combinations'
import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  petService: PetService | null
  isServiceConfigurationModalOpen: boolean
  setIsServiceConfigurationModalOpen: (value: boolean) => void
}

export const ServiceConfigurationModal = ({
  petService,
  isServiceConfigurationModalOpen,
  setIsServiceConfigurationModalOpen,
}: Props) => {
  const [selectedPetTypeId, setSelectedPetTypeId] = useState<string | null>(
    null,
  )
  const { triggerAlert } = useGlobalAlertContext()
  const [form] = Form.useForm()

  const { data: petTypeCombinations, isFetching: isFetchingCombinations } =
    useLoadPetTypeCombinations(selectedPetTypeId, petService?.id)

  const {
    mutate: relatePetServiceConfiguration,
    isPending,
    isSuccess,
    isError,
  } = useRelatePetServiceConfiguration(petService?.id)

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
        currentObjectTreated['executionTime'] !== 0
      ) {
        treatedData.push({ ...currentObjectTreated })
        currentObjectTreated['companyPetHairID'] = 0
        currentObjectTreated['companyPetSizeID'] = 0
        currentObjectTreated['executionTime'] = 0
        currentObjectTreated['price'] = 0
      }
    })

    return {
      configurations: treatedData,
    }
  }

  const removeMaskFromInput = (values: any) =>
    Object.entries(values).reduce((acc, [key, value]: any) => {
      if (key.includes('price')) {
        // Converte o valor formatado para número decimal
        const numericValue =
          Number(value.toString().replace(/[^0-9]/g, '')) / 100
        acc[key] = numericValue
      } else {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>)

  const createServiceConfiguration = () => {
    form.validateFields().then((values) => {
      values = removeMaskFromInput(values)
      const { configurations } = formatDetailedConfigurations(values)

      relatePetServiceConfiguration({
        body: { relations: configurations },
      })
    })
  }

  useEffect(() => {
    if (isSuccess) {
      triggerAlert({
        type: 'success',
        message: 'Configuração salva com sucesso!',
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      triggerAlert({
        type: 'error',
        message: 'Ocorreu um erro ao salvar a configuração!',
      })
    }
  }, [isError])

  const maskPrice = (value: string | number): string => {
    if (value === null) {
      return 'R$ 0,00'
    }

    console.log('value: ', value)
    const numericValue = Number(value.toString().replace(/[^0-9]/g, '')) / 100
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  useEffect(() => {
    if (petTypeCombinations && petTypeCombinations.length > 0) {
      const normalizedValues = petTypeCombinations.reduce((acc, item) => {
        const { size, hair, price, executionTime } = item

        acc[`${size.id}-${hair.id}-size`] = size.id
        acc[`${size.id}-${hair.id}-hair`] = hair.id
        acc[`${size.id}-${hair.id}-executionTime`] = executionTime
        acc[`${size.id}-${hair.id}-price`] = maskPrice(
          price ? price?.toFixed(2) : 0,
        )

        return acc
      }, {} as Record<string, any>)

      form.setFieldsValue(normalizedValues)
    }
  }, [petTypeCombinations, form])

  return (
    <Modal
      title={
        <Col style={{ textAlign: 'center' }}>
          Configuração de {petService?.name.toLowerCase()}
          <Divider />
        </Col>
      }
      open={isServiceConfigurationModalOpen}
      onCancel={() => setIsServiceConfigurationModalOpen(false)}
      cancelText='Cancelar'
      okText='Salvar'
      confirmLoading={isPending}
      width={800}
      onOk={createServiceConfiguration}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label={<Typography.Text strong>Selecione o pet</Typography.Text>}
          style={{ width: '30%' }}
        >
          <Select
            placeholder='Clique para selecionar'
            onSelect={(_, value) => setSelectedPetTypeId(value.key)}
          >
            {petService?.petTypes.map((petType) => (
              <Select.Option key={petType.id} value={petType.name}>
                {petType.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='configurationType'
          label={
            <Col>
              <Typography.Text strong>
                Defina os preços e a duração de cada serviço <br />
              </Typography.Text>

              <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
                Se o preço for 0, o cliente verá a frase "Sob consulta".
              </Typography.Text>
            </Col>
          }
          style={{
            textAlign: 'left',
          }}
        >
          {isFetchingCombinations && (
            <Row justify='center'>
              <Spin />
            </Row>
          )}

          {!isFetchingCombinations && petTypeCombinations?.length === 0 ? (
            <Row justify='center'>
              <Typography.Text type='secondary'>
                Nenhuma configuração encontrada. Cadastre os portes e pelagens
                do pet.
              </Typography.Text>
            </Row>
          ) : (
            !isFetchingCombinations &&
            petTypeCombinations?.map(
              ({ size, hair, price, executionTime }, index) => (
                <Row gutter={[16, 16]} key={`${size.name}-${hair.name}`}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label={index === 0 && 'Tamanho'}
                      name={`${size.id}-${hair.id}-size`}
                      initialValue={size.id}
                      rules={[
                        { required: true, message: 'Tamanho obrigatório.' },
                      ]}
                    >
                      <Select
                        options={[{ value: size.id, label: size.name }]}
                        value={size.id}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label={index === 0 && 'Pelagem'}
                      name={`${size.id}-${hair.id}-hair`}
                      initialValue={hair.id}
                      rules={[
                        { required: true, message: 'Pelagem obrigatória.' },
                      ]}
                    >
                      <Select
                        options={[{ value: hair.id, label: hair.name }]}
                        value={hair.id}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label={index === 0 && 'Duração (em minutos)'}
                      name={`${size.id}-${hair.id}-executionTime`}
                      initialValue={executionTime}
                      rules={[
                        {
                          validator: (_, value) =>
                            value > 0
                              ? Promise.resolve()
                              : Promise.reject('Duração deve ser maior que 0.'),
                        },
                        { required: true },
                      ]}
                    >
                      <Input type='number' min={1} placeholder='Ex: 60' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label={index === 0 && 'Preço'}
                      name={`${size.id}-${hair.id}-price`}
                      rules={[
                        { required: true, message: 'Preço obrigatório.' },
                      ]}
                      initialValue={price}
                    >
                      <Input
                        placeholder='R$ 0,00'
                        defaultValue={maskPrice(price)}
                        onChange={(e) => {
                          const maskedValue = maskPrice(e.target.value)
                          form.setFieldValue(
                            `${size.id}-${hair.id}-price`,
                            maskedValue,
                          )
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            )
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}
