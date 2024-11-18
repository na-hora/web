import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetType } from '@/hooks/na-hora/pet-type/types/load.type'
import { useCreatePetType } from '@/hooks/na-hora/pet-type/use-create-pet-type'
import { useDeletePetType } from '@/hooks/na-hora/pet-type/use-delete-pet-type'
import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { useUpdatePetType } from '@/hooks/na-hora/pet-type/use-update-pet-type'
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

export const AnimalsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPetType, setCurrentPetType] = useState<PetType | null>(null)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const { data: petTypes, isLoading: petTypesLoading } =
    useLoadPetTypes(companyId)

  const {
    mutate: createPetTypeMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreatePetType()

  const {
    mutate: updatePetTypeMutation,
    isPending: updatePending,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdatePetType()
  const {
    mutate: deletePetTypeMutation,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeletePetType()

  const deletePetType = (petTypeId: number) => {
    deletePetTypeMutation({
      dynamicRoute: petTypeId.toString(),
    })
  }

  const createPetType = () => {
    form.validateFields().then((values) => {
      createPetTypeMutation({
        body: {
          name: values.name,
        },
      })
    })
  }

  const updatePetType = () => {
    form.validateFields().then((values) => {
      updatePetTypeMutation({
        body: {
          name: values.name,
        },
        dynamicRoute: currentPetType?.id.toString(),
      })
    })
  }

  const handleEdit = (petType: PetType) => {
    setCurrentPetType(petType)
    setIsEditMode(true)
    form.setFieldsValue({
      name: petType.name,
    })
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsEditMode(false)
    setCurrentPetType(null)
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
      updatePetType()
    } else {
      createPetType()
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
                Pets cadastrados
              </Typography.Title>

              <Button type='primary' onClick={handleCreate}>
                Cadastrar novo pet <PlusCircleOutlined />
              </Button>
            </Row>
            <List
              locale={{ emptyText: 'Nenhum pet cadastrado' }}
              dataSource={petTypes}
              loading={petTypesLoading}
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
                      title='Tem certeza que deseja excluir esse tipo de animal?'
                      onConfirm={() => deletePetType(animal.id)}
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
            title={isEditMode ? 'Editar pet' : 'Cadastrar pet'}
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
                  placeholder='Digite o nome do pet. Ex: Cachorro'
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Col>
  )
}
