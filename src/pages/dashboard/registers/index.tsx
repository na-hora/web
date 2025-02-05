import { AnimalsTab } from '@/components/dashboard/register/register-tabs/animals'
import { HairsTab } from '@/components/dashboard/register/register-tabs/hairs'
import { OperatorsTab } from '@/components/dashboard/register/register-tabs/operators'
import { ServicesTab } from '@/components/dashboard/register/register-tabs/services'
import { SizesTab } from '@/components/dashboard/register/register-tabs/sizes'
import { Col, Row, Tabs } from 'antd'

export const DashboardRegisters = () => {
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

      <Tabs
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'Pets',
            children: <AnimalsTab />,
          },
          {
            key: '2',
            label: 'Portes',
            children: <SizesTab />,
          },
          {
            key: '3',
            label: 'Pelagens',
            children: <HairsTab />,
          },
          {
            key: '4',
            label: 'Serviços',
            children: <ServicesTab />,
          },
          {
            key: '5',
            label: 'Operadores',
            children: <OperatorsTab />,
          },
        ]}
      />
    </>
  )
}
