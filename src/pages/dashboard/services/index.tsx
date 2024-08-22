import { useLoadPetServices } from '@/hooks/na-hora/pet-services/use-load-pet-services'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Col, Collapse, List, Row } from 'antd'
import { lazy } from 'react'
const ServicesForm = lazy(
  () => import('@/components/dashboard/services/services-form'),
)

export const DashboardServices = () => {
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
          <Component />
        </Col>
      </Row>
    </>
  )
}

const Component = () => {
  const { data: services } = useLoadPetServices()

  return (
    <>
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

      <h2>Serviços disponíveis</h2>
      <List
        size='large'
        dataSource={services}
        style={{
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0 0 10px #ccc',
        }}
        renderItem={(service) => (
          <Collapse
            items={[
              {
                key: service.id,
                label: <b>{service.name}</b>,
                children: (
                  <ServicesForm edition id={service.id} name={service.name} />
                ),
              },
            ]}
            bordered
            style={{
              margin: '10px 0px',
            }}
          />
        )}
      />
    </>
  )
}
