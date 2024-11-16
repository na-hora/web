import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { useCreatePetType } from '@/hooks/na-hora/pet-type/use-create-pet-type'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, Modal, Popconfirm, Tooltip } from 'antd'
import { useEffect, useState } from 'react'

export const AnimalsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { triggerAlert } = useGlobalAlertContext()

  const [form] = Form.useForm()

  const {
    mutate: createPetTypeMutation,
    isSuccess,
    isError,
  } = useCreatePetType()

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

      <List
        // dataSource={services}
        renderItem={() => (
          <List.Item
            actions={[
              <Popconfirm
                title='Tem certeza que deseja excluir esse serviço?'
                // onConfirm={() => deletePetService(service.id)}
              >
                <Tooltip title='Excluir'>
                  <DeleteOutlined />
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            {/* {service.name} */}
            eita
          </List.Item>
        )}
      />

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
