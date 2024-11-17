import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetType } from '@/hooks/na-hora/pet-type/types/load.type'
import { useCreatePetType } from '@/hooks/na-hora/pet-type/use-create-pet-type'
import { useDeletePetType } from '@/hooks/na-hora/pet-type/use-delete-pet-type'
import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { useUpdatePetType } from '@/hooks/na-hora/pet-type/use-update-pet-type'
import { PlusCircleOutlined } from '@ant-design/icons'
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
  const { mutate: deletePetTypeMutation } = useDeletePetType()

  const deletePetType = (petServiceId: number) => {
    deletePetTypeMutation({
      dynamicRoute: petServiceId.toString(),
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
    if (createSuccess || updateSuccess) {
      setIsModalOpen(false)
      triggerAlert({
        message: isEditMode
          ? 'Animal atualizado com sucesso'
          : 'Animal cadastrado com sucesso',
        type: 'success',
      })
      form.resetFields()
    }

    if (createError || updateError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado',
        type: 'error',
      })
    }
  }, [createSuccess, createError, updateSuccess, updateError])

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
    <Col span={8}>
      <Row justify='start'>
        <Button type='primary' onClick={handleCreate}>
          Cadastrar novo pet <PlusCircleOutlined />
        </Button>
      </Row>

      <Col span={24}>
        <Typography.Title level={4}>Pets cadastrados</Typography.Title>
        <List
          dataSource={petTypes}
          loading={petTypesLoading}
          renderItem={(service) => (
            <List.Item
              actions={[
                <Button type='link' onClick={() => handleEdit(service)}>
                  Editar
                </Button>,
                <Popconfirm
                  title='Tem certeza que deseja excluir esse serviço?'
                  onConfirm={() => deletePetType(service.id)}
                >
                  <Button type='link' danger>
                    Excluir
                  </Button>
                </Popconfirm>,
              ]}
            >
              {service.name}
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
        <Form form={form}>
          <Form.Item label='Nome' required name='name'>
            <Input
              name='name'
              type='text'
              placeholder='Digite o nome do animal. Ex: Cachorro'
            />
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  )
}
