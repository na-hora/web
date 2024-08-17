import { ServicesForm } from '@/components/dashboard/services/services-form'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Col, Collapse, List, Row } from 'antd'
import { Suspense } from 'react'

type Service = {
  id: number
  name: string
  parallelism: number
  configurations: {
    companyPetSizeId: number
    companyPetHairId: number
    value: number
    executionTime: number
  }[]
}

export const DashboardServices = () => {
  // const [form] = Form.useForm()
  const services = [
    { id: 1, name: 'Banho', parallelism: 1, configurations: [] },
    { id: 2, name: 'Banho e tosa', parallelism: 2, configurations: [] },
    { id: 3, name: 'Tosa', parallelism: 3, configurations: [] },
  ]

  return (
    <Suspense fallback='Carregando...'>
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
          <Component services={services} />
        </Col>
      </Row>
    </Suspense>
  )
}

const Component = ({ services }: { services: Service[] }) => {
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
                  <ServicesForm
                    edition
                    id={service.id}
                    name={service.name}
                    parallelism={service.parallelism}
                    configurations={service.configurations}
                  />
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
