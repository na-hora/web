import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useCreatePetType } from '@/hooks/na-hora/pet-type/use-create-pet-type'
import { useDeletePetType } from '@/hooks/na-hora/pet-type/use-delete-pet-type'
import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Tooltip,
} from 'antd'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export const AnimalsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const { data: petTypes } = useLoadPetTypes(companyId)

  const {
    mutate: createPetTypeMutation,
    isSuccess,
    isError,
  } = useCreatePetType()

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

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false)
      triggerAlert({
        message: 'Animal cadastrado com sucesso',
        type: 'success',
      })

      form.resetFields()
    }

    if (isError) {
      triggerAlert({
        message: 'Ocorreu um erro inesperado',
        type: 'error',
      })
    }
  }, [isSuccess, isError])

  return (
    <>
      <p>Cadastre os animais que serão atendidos</p>

      <Button type='primary' onClick={() => setIsModalOpen(true)}>
        Cadastrar novo animal <PlusCircleOutlined />
      </Button>

      <Col span={8}>
        <h3>Animais cadastrados</h3>
        <List
          dataSource={petTypes}
          renderItem={(service) => (
            <List.Item
              actions={[
                <Button type='link'>Editar</Button>,
                <Popconfirm
                  title='Tem certeza que deseja excluir esse serviço?'
                  onConfirm={() => deletePetType(service.id)}
                >
                  <Tooltip title='Excluir'>
                    <DeleteOutlined />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              {service.name}
            </List.Item>
          )}
        />
      </Col>

      <Modal
        title='Cadastrar animal'
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onOk={createPetType}
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
    </>
  )
}
