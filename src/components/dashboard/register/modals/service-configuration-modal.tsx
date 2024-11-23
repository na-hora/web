import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetService } from '@/hooks/na-hora/pet-services/types/list.type'
import { useRelatePetServiceConfiguration } from '@/hooks/na-hora/pet-services/use-relate-pet-service-configuration'
import { LoadPetTypeCombinationsResponse } from '@/hooks/na-hora/pet-type-combinations/types/load.type'
import { useLoadPetTypeCombinations } from '@/hooks/na-hora/pet-type-combinations/use-load-pet-type-combinations'
import { colors } from '@/utils/colors'
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
  const [sizeColorMap, setSizeColorMap] = useState<Record<string, string>>()

  const [form] = Form.useForm()
  const { triggerAlert } = useGlobalAlertContext()

  const { data: petTypeCombinations, isFetching: isFetchingCombinations } =
    useLoadPetTypeCombinations(selectedPetTypeId, petService?.id)

  const generateSizeColorMap = (data: LoadPetTypeCombinationsResponse) => {
    const uniqueSizes = Array.from(new Set(data.map((item) => item.size.name)))

    const sizeColorMap: Record<string, string> = {}
    uniqueSizes.forEach((size, index) => {
      sizeColorMap[size] = colors[index % colors.length]
    })

    return sizeColorMap
  }

  useEffect(() => {
    if (!petTypeCombinations) return

    setSizeColorMap(generateSizeColorMap(petTypeCombinations))
  }, [petTypeCombinations])

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
      configurations: treatedData,
    }
  }

  const createServiceConfiguration = () => {
    form.validateFields().then((values) => {
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
        >
          <Select
            placeholder='Selecione o pet que deseja configurar'
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
            <Typography.Text strong>
              Defina os preços e a duração de cada serviço
            </Typography.Text>
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
                Nenhuma configuração encontrada. Cadastre os portes e preços do
                pet.
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
                        style={{
                          border: `1px solid ${sizeColorMap?.[size.name]}`,
                          borderRadius: 6,
                        }}
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
                      rules={[
                        { required: true, message: 'Duração obrigatória.' },
                      ]}
                      initialValue={executionTime}
                    >
                      <Input placeholder='Ex: 60' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label={index === 0 && 'Preço (em Reais)'}
                      name={`${size.id}-${hair.id}-price`}
                      rules={[
                        { required: true, message: 'Preço obrigatório.' },
                      ]}
                      initialValue={price}
                    >
                      <Input placeholder='R$' />
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
