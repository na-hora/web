import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetService } from '@/hooks/na-hora/pet-services/types/list.type'
import { useCreatePetServices } from '@/hooks/na-hora/pet-services/use-create-pet-services'
import { useDeletePetServices } from '@/hooks/na-hora/pet-services/use-delete-pet-services'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { useUpdatePetServices } from '@/hooks/na-hora/pet-services/use-update-pet-services'
import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Row,
  Select,
  Typography,
} from 'antd'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { ServiceConfigurationModal } from '../../modals/service-configuration-modal'

export const ServicesTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isServiceConfigurationModalOpen, setIsServiceConfigurationModalOpen] =
    useState(false)
  const [currentPetService, setCurrentPetService] = useState<PetService | null>(
    null,
  )
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const {
    data: petServices,
    isLoading: petServicesLoading,
    isRefetching: petServicesRefetching,
  } = useLoadPetServices(companyId)

  const {
    mutate: createPetServiceMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreatePetServices()

  const {
    mutate: updatePetServiceMutation,
    isPending: updatePending,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdatePetServices()
  const {
    mutate: deletePetServiceMutation,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeletePetServices()

  const { data: petTypes } = useLoadPetTypes(companyId)

  const deletePetService = (petServiceId: number) => {
    deletePetServiceMutation({
      dynamicRoute: petServiceId.toString(),
    })
  }

  const createPetService = () => {
    form.validateFields().then((values) => {
      createPetServiceMutation({
        body: {
          name: values.name,
          paralellism: Number(values.paralellism),
          petTypes: values.petTypes,
        },
      })
    })
  }

  const updatePetService = () => {
    form.validateFields().then((values: PetService) => {
      updatePetServiceMutation({
        body: {
          name: values.name,
          paralellism: Number(values.paralellism),
          petTypes: values.petTypes,
        },
        dynamicRoute: currentPetService?.id.toString(),
      })
    })
  }

  const handleEdit = (petService: PetService) => {
    setCurrentPetService(petService)
    setIsEditMode(true)
    form.setFieldsValue({
      name: petService.name,
      paralellism: petService.paralellism,
      petTypes: petService.petTypes.map((petType) => petType.id),
    })
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsEditMode(false)
    setCurrentPetService(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (createSuccess || updateSuccess || deleteSuccess) {
      setIsModalOpen(false)
      triggerAlert({
        message: 'Operação realizada com sucesso',
        type: 'success',
      })
      form.resetFields()
    }
  }, [createSuccess, updateSuccess, deleteSuccess])

  useEffect(() => {
    if (createError || updateError || deleteError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado na operação',
        type: 'error',
      })
    }
  }, [createError, updateError, deleteError])

  const handleOk = () => {
    if (isEditMode) {
      updatePetService()
    } else {
      createPetService()
    }
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const openConfigurationsModal = (petService: PetService) => {
    setCurrentPetService(petService)
    setIsServiceConfigurationModalOpen(true)
  }

  return (
    <Col span={24}>
      <Row justify='center'>
        <Col span={16}>
          <Col span={24}>
            <Row justify='space-between' align='middle'>
              <Typography.Title level={4} style={{ marginBottom: '24px' }}>
                Serviços cadastrados
              </Typography.Title>

              <Button type='primary' onClick={handleCreate}>
                Cadastrar novo serviço <PlusCircleOutlined />
              </Button>
            </Row>

            <List
              locale={{ emptyText: 'Nenhum serviço cadastrado' }}
              dataSource={petServices}
              loading={petServicesLoading || petServicesRefetching}
              renderItem={(petService) => (
                <List.Item
                  actions={[
                    <Button
                      type='link'
                      onClick={() => openConfigurationsModal(petService)}
                      icon={<SettingOutlined />}
                    >
                      Configurações
                    </Button>,
                    <Button
                      type='link'
                      onClick={() => handleEdit(petService)}
                      icon={<EditOutlined />}
                    >
                      Editar
                    </Button>,
                    <Popconfirm
                      title='Tem certeza que deseja excluir esse serviço?'
                      onConfirm={() => deletePetService(petService.id)}
                    >
                      <Button type='link' danger icon={<DeleteOutlined />}>
                        Excluir
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  {petService.name}
                </List.Item>
              )}
            />
          </Col>

          <Modal
            title={isEditMode ? 'Editar serviço' : 'Cadastrar serviço'}
            open={isModalOpen}
            onCancel={onCloseModal}
            footer={[
              <Button key='back' onClick={onCloseModal}>
                Cancelar
              </Button>,
              <Button
                key='submit'
                type='primary'
                loading={createPending || updatePending}
                onClick={handleOk}
              >
                {isEditMode ? 'Atualizar' : 'Cadastrar'}
              </Button>,
            ]}
          >
            <Form
              form={form}
              layout='vertical'
              onKeyUp={(e) => e.key === 'Enter' && handleOk()}
            >
              <Form.Item
                label='Nome'
                rules={[{ required: true, message: 'Nome obrigatório' }]}
                name='name'
              >
                <Input
                  name='name'
                  type='text'
                  placeholder='Digite o nome do serviço. Ex: Banho'
                />
              </Form.Item>
              <Form.Item
                label='Atendimentos simultâneos'
                rules={[
                  {
                    required: true,
                    message: 'Atendimentos simultâneos obrigatórios',
                  },
                ]}
                name='paralellism'
              >
                <Input
                  name='paralellism'
                  type='number'
                  placeholder='Digite a quantidade de atendimentos possíveis simultaneamente.'
                />
              </Form.Item>
              <Form.Item
                name='petTypes'
                label='Pets por atendimento'
                rules={[
                  {
                    required: true,
                    message: 'Pets por atendimento obrigatórios',
                  },
                ]}
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Selecione os tipos de pets'
                >
                  {petTypes?.map((petType) => (
                    <Select.Option key={petType.id} value={petType.id}>
                      {petType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>

          {isServiceConfigurationModalOpen && (
            <ServiceConfigurationModal
              petService={currentPetService}
              isServiceConfigurationModalOpen={isServiceConfigurationModalOpen}
              setIsServiceConfigurationModalOpen={
                setIsServiceConfigurationModalOpen
              }
            />
          )}
        </Col>
      </Row>
    </Col>
  )
}
