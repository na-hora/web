import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useCreatePetServices } from '@/hooks/na-hora/pet-services/use-create-pet-services'
import { useDeletePetServices } from '@/hooks/na-hora/pet-services/use-delete-pet-services'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { useUpdatePetServices } from '@/hooks/na-hora/pet-services/use-update-pet-services'
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
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
  Typography,
} from 'antd'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export const ServicesTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPetService, setCurrentPetService] = useState<{
    id: number
    name: string
  } | null>(null)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const { data: petServices, isLoading: petServicesLoading } =
    useLoadPetServices(companyId)

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

  const deletePetService = (petServiceId: number) => {
    deletePetServiceMutation({
      dynamicRoute: petServiceId.toString(),
    })
  }

  const createPetService = () => {
    form.validateFields().then((values) => {
      createPetServiceMutation({
        body: {
          // name: values.name,
          configurations: [
            {
              companyPetHairID: 1,
              companyPetSizeID: 1,
              executionTime: 10,
              price: 10,
            },
          ],
          name: 'teste',
          paralellism: 1,
        },
      })
    })
  }

  const updatePetService = () => {
    form.validateFields().then((values) => {
      updatePetServiceMutation({
        body: {
          configurations: [
            {
              companyPetHairID: 1,
              companyPetSizeID: 1,
              executionTime: 10,
              price: 10,
            },
          ],
          name: 'teste',
          paralellism: 1,
        },
        dynamicRoute: currentPetService?.id.toString(),
      })
    })
  }

  const handleEdit = (petService: { id: number; name: string }) => {
    setCurrentPetService(petService)
    setIsEditMode(true)
    form.setFieldsValue({
      name: petService.name,
      paralellism: 9999,
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
              loading={petServicesLoading}
              renderItem={(animal) => (
                <List.Item
                  actions={[
                    <Button
                      type='link'
                      onClick={() => handleEdit(animal)}
                      icon={<EditOutlined />}
                    >
                      Editar
                    </Button>,
                    <Popconfirm
                      title='Tem certeza que deseja excluir esse serviço?'
                      onConfirm={() => deletePetService(animal.id)}
                    >
                      <Button type='link' danger icon={<DeleteOutlined />}>
                        Excluir
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  {animal.name}
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
            <Form form={form} layout='vertical'>
              <Form.Item label='Nome' required name='name'>
                <Input
                  name='name'
                  type='text'
                  placeholder='Digite o nome do serviço. Ex: Banho'
                />
              </Form.Item>
              <Form.Item
                label='Atendimentos simultâneos'
                required
                name='paralellism'
              >
                <Input
                  name='paralellism'
                  type='number'
                  placeholder='Digite a quantidade de atendimentos possíveis simultaneamente.'
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Col>
  )
}
