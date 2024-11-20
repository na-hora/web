import { useGlobalAlertContext } from '@/contexts/global-alert-context'
import { PetHair } from '@/hooks/na-hora/pet-hair/types/load.type'
import { useCreatePetHair } from '@/hooks/na-hora/pet-hair/use-create-pet-hair'
import { useDeletePetHair } from '@/hooks/na-hora/pet-hair/use-delete-pet-hair'
import { useLoadPetHairs } from '@/hooks/na-hora/pet-hair/use-load-pet-hairs'

import { useUpdatePetHair } from '@/hooks/na-hora/pet-hair/use-update-pet-hair'
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

export const HairsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentPetHair, setCurrentPetHair] = useState<PetHair | null>(null)
  const { triggerAlert } = useGlobalAlertContext()
  const companyCookie = parseCookies()['inf@na-hora']
  const { id: companyId } = JSON.parse(companyCookie)

  const [form] = Form.useForm()

  const {
    data: petHairs,
    isLoading: petHairsLoading,
    isRefetching: petHairsRefetching,
  } = useLoadPetHairs(companyId)

  const { data: petTypes } = useLoadPetTypes(companyId)

  const {
    mutate: createPetHairMutation,
    isPending: createPending,
    isSuccess: createSuccess,
    isError: createError,
  } = useCreatePetHair()

  const {
    mutate: updatePetHairMutation,
    isPending: updatePending,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdatePetHair()
  const {
    mutate: deletePetHairMutation,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useDeletePetHair()

  const deletePetHair = (petHairId: number) => {
    deletePetHairMutation({
      dynamicRoute: petHairId.toString(),
    })
  }

  const createPetHair = () => {
    form.validateFields().then((values) => {
      createPetHairMutation({
        body: {
          name: values.name,
          description: values.description,
          companyPetTypeId: values.petTypeId,
        },
      })
    })
  }

  const updatePetHair = () => {
    form.validateFields().then((values) => {
      updatePetHairMutation({
        body: {
          name: values.name,
          description: values.description,
          companyPetTypeId: 1,
        },
        dynamicRoute: currentPetHair?.id.toString(),
      })
    })
  }

  const handleEdit = (petHair: PetHair) => {
    setCurrentPetHair(petHair)
    setIsEditMode(true)
    form.setFieldsValue({
      name: petHair.name,
      description: petHair.description,
      petTypeId: {
        key: petHair.companyPetTypeId,
        label: petHair.companyPetTypeName,
      },
    })
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setIsEditMode(false)
    setCurrentPetHair(null)
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
      updatePetHair()
    } else {
      createPetHair()
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
                Pelagens cadastradas por pet
              </Typography.Title>

              <Button type='primary' onClick={handleCreate}>
                Cadastrar nova pelagem <PlusCircleOutlined />
              </Button>
            </Row>

            {petTypes && petTypes?.length > 0 ? (
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
                              petHairs?.filter(
                                (petHair) =>
                                  petHair.companyPetTypeId === petType.id,
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
                          emptyText: 'Nenhuma pelagem cadastrada para esse pet',
                        }}
                        dataSource={petHairs?.filter(
                          (hair) => hair.companyPetTypeId === petType.id,
                        )}
                        loading={petHairsLoading || petHairsRefetching}
                        renderItem={(hair) => (
                          <List.Item
                            actions={[
                              <Button
                                type='link'
                                onClick={() => handleEdit(hair)}
                                icon={<EditOutlined />}
                              >
                                Editar
                              </Button>,
                              <Popconfirm
                                title='Tem certeza que deseja excluir essa pelagem?'
                                onConfirm={() => deletePetHair(hair.id)}
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
                            <Col>
                              <Typography.Text>{hair.name}</Typography.Text>
                              <br />
                              <Typography.Text type='secondary'>
                                {hair.description}
                              </Typography.Text>
                            </Col>
                          </List.Item>
                        )}
                      />
                    </Collapse.Panel>
                  ))}
              </Collapse>
            ) : (
              <Row justify='center'>
                <Typography.Text type='secondary'>
                  Nenhuma pelagem cadastrada
                </Typography.Text>
              </Row>
            )}
          </Col>

          <Modal
            title={isEditMode ? 'Editar pelagem' : 'Cadastrar pelagem'}
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
                  placeholder='Digite a pelagem. Ex: Longa'
                />
              </Form.Item>
              <Form.Item label='Descrição' name='description'>
                <Input
                  name='description'
                  type='text'
                  placeholder='Descreva a pelagem. Ex: Até 5cm'
                />
              </Form.Item>
              <Form.Item
                label='Pet'
                rules={[{ required: true, message: 'Pet obrigatório' }]}
                name='petTypeId'
              >
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
