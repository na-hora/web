import { AnimalsTab } from '@/components/dashboard/register/register-tabs/animals'
import { HairsTab } from '@/components/dashboard/register/register-tabs/hairs'
import { ServicesTab } from '@/components/dashboard/register/register-tabs/services'
import { SizesTab } from '@/components/dashboard/register/register-tabs/sizes'
// import { useDeletePetServices } from '@/hooks/na-hora/pet-services/use-delete-pet-services'
// import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { Col, Row, Tabs } from 'antd'

export const DashboardRegisters = () => {
  // const { data: services } = useLoadPetServices()
  // const { mutate: deletePetServiceMutation } = useDeletePetServices()

  // const deletePetService = (petServiceId: number) => {
  //   deletePetServiceMutation({
  //     dynamicRoute: petServiceId.toString(),
  //   })
  // }

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <h1 style={{ marginBottom: '4px' }}>Cadastro</h1>
          <span>
            Gerencie aqui os dados da sua empresa que serão disponibilizados ao
            público
          </span>
        </Col>
      </Row>

      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Pets' key='1'>
          <AnimalsTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Portes' key='2'>
          <SizesTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Pelagens' key='3'>
          <HairsTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab='Serviços' key='4'>
          <ServicesTab />
          {/* <p>Cadastre os serviços oferecidos</p>
          <Row justify='center'>
            <Col span={16}>
              <Collapse
                expandIcon={() => (
                  <PlusCircleOutlined style={{ color: 'white' }} />
                )}
                items={[
                  {
                    key: '0',
                    label: (
                      <b style={{ color: 'white' }}>Adicionar novo serviço</b>
                    ),
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
          </Row> */}
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}
