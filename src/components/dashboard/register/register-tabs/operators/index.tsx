import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { Operator } from '@/hooks/na-hora/operators/types/load.type'
import { useCreateOperator } from '@/hooks/na-hora/operators/use-create-operator'
import { useDeleteOperator } from '@/hooks/na-hora/operators/use-delete-operator'
import { useLoadOperators } from '@/hooks/na-hora/operators/use-load-operators'
import { useUpdateOperator } from '@/hooks/na-hora/operators/use-update-operator'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
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
  Select,
  Typography,
} from 'antd'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

export const OperatorsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const {
    data: petServicesData,
    isLoading: petServicesLoading,
    isRefetching: petServicesRefetching,
  } = useLoadPetServices(companyId)

  const {
    data: operatorsData,
    isLoading: operatorsLoading,
    isRefetching: operatorsRefetching,
  } = useLoadOperators()

  const {
    mutate: createOperatorMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreateOperator()

  const {
    mutate: updateOperatorMutation,
    isPending: updatePending,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateOperator()
  const {
    mutate: deleteOperatorMutation,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeleteOperator()

  const deleteOperator = (operatorId: number) => {
    deleteOperatorMutation({
      dynamicRoute: operatorId.toString(),
    })
  }

  const createOperator = () => {
    form.validateFields().then((values) => {
      createOperatorMutation({
        body: {
          name: values.name,
          services: values.petServices,
        },
      })
    })
  }

  const updateOperator = () => {
    form.validateFields().then((values) => {
      updateOperatorMutation({
        body: {
          name: values.name,
          services: values.petServices,
        },
        dynamicRoute: currentOperator?.id.toString(),
      })
    })
  }

  const handleEdit = (operator: Operator) => {
    setCurrentOperator(operator)
    setIsEditMode(true)
    form.setFieldsValue({
      name: operator.name,
      petServices: operator.petServices?.map((service) => service.id),
    })
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsEditMode(false)
    setCurrentOperator(null)
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
      updateOperator()
    } else {
      createOperator()
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
                Operadores cadastrados
              </Typography.Title>

              <Button type='primary' onClick={handleCreate}>
                Cadastrar novo operador <PlusCircleOutlined />
              </Button>
            </Row>
            <List
              locale={{ emptyText: 'Nenhum operador cadastrado' }}
              dataSource={operatorsData?.operators}
              loading={operatorsLoading || operatorsRefetching}
              renderItem={(operator) => (
                <List.Item
                  actions={[
                    <Button
                      type='link'
                      onClick={() => handleEdit(operator)}
                      icon={<EditOutlined />}
                    >
                      Editar
                    </Button>,
                    <Popconfirm
                      title='Tem certeza que deseja excluir esse operador?'
                      onConfirm={() => deleteOperator(operator.id)}
                    >
                      <Button type='link' danger icon={<DeleteOutlined />}>
                        Excluir
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography.Text
                      strong
                      style={{ fontSize: '16px', marginBottom: '4px' }}
                    >
                      {operator.name}
                    </Typography.Text>

                    <Typography.Text
                      type='secondary'
                      style={{
                        fontSize: '12px',
                        color: '#888',
                        marginTop: '2px',
                        lineHeight: '1.4',
                      }}
                    >
                      {operator.petServices
                        ?.map((service) => service.name)
                        .join(', ') || 'Nenhum serviço'}
                    </Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </Col>

          <Modal
            title={isEditMode ? 'Editar operador' : 'Cadastrar operador'}
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
            <Form form={form} layout='vertical' onFinish={handleOk}>
              <Form.Item
                label='Nome'
                rules={[{ required: true, message: 'Nome obrigatório' }]}
                name='name'
              >
                <Input
                  name='name'
                  type='text'
                  placeholder='Digite o nome do operador. Ex: Atendente joão'
                />
              </Form.Item>
              <Form.Item
                name='petServices'
                label='Serviços atendidos por esse atendente'
                rules={[
                  {
                    required: true,
                    message: 'Serviços atendidos obrigatórios',
                  },
                ]}
              >
                <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Selecione os serviços'
                  loading={petServicesLoading || petServicesRefetching}
                >
                  {petServicesData?.map((petService) => (
                    <Select.Option key={petService.id} value={petService.id}>
                      {petService.name}
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
