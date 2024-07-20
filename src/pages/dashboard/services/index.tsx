import { ServicesForm } from '@/components/dashboard/services/services-form'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Collapse, List } from 'antd'
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
      <Component services={services} />
    </Suspense>
  )
}

const Component = ({ services }: { services: Service[] }) => {
  return (
    <>
      <Collapse
        expandIcon={() => <PlusCircleOutlined />}
        items={[
          {
            key: '0',
            label: <b style={{ color: 'white' }}>Novo serviço</b>,
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
