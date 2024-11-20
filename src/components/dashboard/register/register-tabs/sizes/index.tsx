import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetSize } from '@/hooks/na-hora/pet-size/types/load.type'
import { useCreatePetSize } from '@/hooks/na-hora/pet-size/use-create-pet-size'
import { useDeletePetSize } from '@/hooks/na-hora/pet-size/use-delete-pet-size'
import { useLoadPetSizes } from '@/hooks/na-hora/pet-size/use-load-pet-sizes'
import { useUpdatePetSize } from '@/hooks/na-hora/pet-size/use-update-pet-size'
import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Collapse,
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

export const SizesTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPetSize, setCurrentPetSize] = useState<PetSize | null>(null)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const { data: petSizes, isLoading: petSizesLoading } =
    useLoadPetSizes(companyId)

  const { data: petTypes } = useLoadPetTypes(companyId)

  const {
    mutate: createPetSizeMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreatePetSize()

  const {
    mutate: updatePetSizeMutation,
    isPending: updatePending,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdatePetSize()
  const {
    mutate: deletePetSizeMutation,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeletePetSize()

  const deletePetSize = (petSizeId: number) => {
    deletePetSizeMutation({
      dynamicRoute: petSizeId.toString(),
    })
  }

  const createPetSize = () => {
    form.validateFields().then((values) => {
      createPetSizeMutation({
        body: {
          name: values.name,
          description: values.description,
          companyPetTypeId: values.petTypeId,
        },
      })
    })
  }

  const updatePetSize = () => {
    form.validateFields().then((values) => {
      updatePetSizeMutation({
        body: {
          name: values.name,
          description: values.description,
          companyPetTypeId: 1,
        },
        dynamicRoute: currentPetSize?.id.toString(),
      })
    })
  }

  const handleEdit = (petSize: PetSize) => {
    setCurrentPetSize(petSize)
    setIsEditMode(true)
    form.setFieldsValue({
      name: petSize.name,
      description: petSize.description,
      petTypeId: {
        key: petSize.companyPetTypeId,
        label: petSize.companyPetTypeName,
      },
    })
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsEditMode(false)
    setCurrentPetSize(null)
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
      updatePetSize()
    } else {
      createPetSize()
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
                Portes cadastrados por pet
              </Typography.Title>

              <Button type='primary' onClick={handleCreate}>
                Cadastrar novo porte <PlusCircleOutlined />
              </Button>
            </Row>

            <Collapse
              defaultActiveKey={['1']}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {petTypes
                ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((petType) => (
                  <Collapse.Panel
                    header={
                      <Row justify='space-between'>
                        <Typography.Text>{petType.name}</Typography.Text>
                        <Typography.Text type='secondary'>
                          {
                            petSizes?.filter(
                              (size) => size.companyPetTypeId === petType.id,
                            ).length
                          }{' '}
                          portes cadastrados
                        </Typography.Text>
                      </Row>
                    }
                    key={petType.id}
                  >
                    <List
                      locale={{
                        emptyText: 'Nenhum porte cadastrado para esse pet',
                      }}
                      dataSource={petSizes?.filter(
                        (size) => size.companyPetTypeId === petType.id,
                      )}
                      loading={petSizesLoading}
                      renderItem={(size) => (
                        <List.Item
                          actions={[
                            <Button
                              type='link'
                              onClick={() => handleEdit(size)}
                              icon={<EditOutlined />}
                            >
                              Editar
                            </Button>,
                            <Popconfirm
                              title='Tem certeza que deseja excluir esse porte?'
                              onConfirm={() => deletePetSize(size.id)}
                            >
                              <Button
                                type='link'
                                danger
                                icon={<DeleteOutlined />}
                              >
                                Excluir
                              </Button>
                            </Popconfirm>,
                          ]}
                        >
                          {size.name}
                        </List.Item>
                      )}
                    />
                  </Collapse.Panel>
                ))}
            </Collapse>
          </Col>

          <Modal
            title={isEditMode ? 'Editar porte' : 'Cadastrar porte'}
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
                  placeholder='Digite o porte. Ex: Pequeno'
                />
              </Form.Item>
              <Form.Item label='Descrição' name='description'>
                <Input
                  name='description'
                  type='text'
                  placeholder='Descreva o porte. Ex: Até 5kg'
                />
              </Form.Item>
              <Form.Item label='Pet' required name='petTypeId'>
                <Select placeholder='Escolha o pet' disabled={isEditMode}>
                  {petTypes?.map((type) => (
                    <Select.Option key={type.id} value={type.id}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Col>
  )
}
