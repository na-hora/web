import { AnimalsTab } from '@/components/dashboard/register/register-tabs/animals'
import { HairsTab } from '@/components/dashboard/register/register-tabs/hairs'
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
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}
