import { useDeletePetServices } from '@/hooks/na-hora/pet-services/use-delete-pet-services'
import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, List, Popconfirm, Row, Tooltip } from 'antd'
// const ServicesForm = lazy(
//   () => import('@/components/dashboard/services/services-form'),
// )
import ServicesForm from '@/components/dashboard/services/services-form'

export const DashboardServices = () => {
  const { data: services } = useLoadPetServices()
  const { mutate: deletePetServiceMutation } = useDeletePetServices()

  const deletePetService = (petServiceId: number) => {
    deletePetServiceMutation({
      dynamicRoute: petServiceId.toString(),
    })
  }

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <h1 style={{ marginBottom: '4px' }}>Serviços</h1>
          <span>
            Gerencie aqui os serviços da sua empresa que serão disponibilizados
            ao público
          </span>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={16}>
          <Collapse
            expandIcon={() => <PlusCircleOutlined style={{ color: 'white' }} />}
            items={[
              {
                key: '0',
                label: <b style={{ color: 'white' }}>Adicionar novo serviço</b>,
                children: <ServicesForm id={0} />,
              },
            ]}
            bordered
            style={{
              margin: '10px 0px',
              backgroundColor: '#4096ff',
              textAlign: 'center',
            }}
          />

          {/* <h2>Serviços disponíveis</h2> */}
          <List
            size='large'
            dataSource={services}
            style={{
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0 0 10px #ccc',
            }}
            renderItem={(service) => (
              <Row justify='space-between' align='top'>
                <Collapse
                  items={[
                    {
                      key: service.id,
                      label: (
                        <Row>
                          <Col>{service.name}</Col>
                        </Row>
                      ),
                      children: (
                        <ServicesForm
                          edition
                          id={service.id}
                          name={service.name}
                        />
                      ),
                    },
                  ]}
                  bordered
                  style={{
                    margin: '10px 0px',
                    width: '90%',
                  }}
                />

                <Col>
                  <Tooltip
                    title={`Desativar ${service.name}`}
                    placement='right'
                  >
                    <Popconfirm
                      title='Tem certeza que deseja desativar este serviço?'
                      onConfirm={() => deletePetService(service.id)}
                    >
                      <Button
                        style={{
                          height: '50px',
                          border: 'none',
                          boxShadow: 'none',
                          marginTop: '8px',
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
