import { PetService } from '@/hooks/na-hora/pet-services/types/list.type'
import { useLoadPetTypeCombinations } from '@/hooks/na-hora/pet-type-combinations/use-load-pet-type-combinations'
import { QuestionCircleOutlined } from '@ant-design/icons'
import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd'
import { useState } from 'react'

type Props = {
  petService: PetService | null
  isServiceConfigurationModalOpen: boolean
  setIsServiceConfigurationModalOpen: (value: boolean) => void
}

export const ServiceConfigurationModal = ({
  petService,
  isServiceConfigurationModalOpen,
  setIsServiceConfigurationModalOpen,
}: Props) => {
  const [selectedPetTypeId, setSelectedPetTypeId] = useState<string | null>(
    null,
  )
  const [configurationRadio, setConfigurationRadio] = useState(0)

  const [form] = Form.useForm()

  const { data: petTypeCombinations } =
    useLoadPetTypeCombinations(selectedPetTypeId)

  const onChangeConfigurationRadio = (e: RadioChangeEvent) => {
    setConfigurationRadio(e.target.value)
  }

  const uniqueConfigurationForAllServices = configurationRadio === 0
  const detailedConfigurationForAllServices = configurationRadio === 1

  return (
    <Modal
      title={
        <Col style={{ textAlign: 'center' }}>
          Configuração de {petService?.name.toLowerCase()}
          <Divider />
        </Col>
      }
      open={isServiceConfigurationModalOpen}
      onCancel={() => setIsServiceConfigurationModalOpen(false)}
      cancelText='Cancelar'
      okText='Salvar'
      width={700}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label={<Typography.Text strong>Selecione o pet</Typography.Text>}
        >
          <Select
            placeholder='Selecione o pet que deseja configurar'
            onSelect={(_, value) => setSelectedPetTypeId(value.key)}
          >
            {petService?.petTypes.map((petType) => (
              <Select.Option key={petType.id} value={petType.name}>
                {petType.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='configurationType'
          label={
            <Typography.Text strong>
              Selecione o tipo de configuração
            </Typography.Text>
          }
          style={{
            textAlign: 'left',
          }}
        >
          <Radio.Group
            onChange={onChangeConfigurationRadio}
            value={configurationRadio}
            defaultValue={0}
          >
            <Radio
              value={0}
              style={{ marginBottom: '16px' }}
              disabled={!selectedPetTypeId}
            >
              Configuração única para todos os atendimentos
            </Radio>

            <Radio
              value={1}
              style={{ margin: '16px 0' }}
              disabled={!selectedPetTypeId}
            >
              Configuração detalhada por combinação
            </Radio>

            {uniqueConfigurationForAllServices && selectedPetTypeId && (
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Form.Item
                    label={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Duração
                        <Tooltip title='Duração em minutos em média do atendimento.'>
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>
                    }
                    name='executionTime'
                    rules={[
                      { required: true, message: 'Duração obrigatória.' },
                    ]}
                  >
                    <Input
                      placeholder='Duração'
                      disabled={!selectedPetTypeId}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        Preço
                        <Tooltip title='Preço em reais em média do atendimento.'>
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </div>
                    }
                    name='price'
                    rules={[{ required: true, message: 'Preço obrigatório.' }]}
                  >
                    <Input
                      placeholder='Preço'
                      disabled={!selectedPetTypeId}
                      style={{ width: '50%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}

            {detailedConfigurationForAllServices ??
              petTypeCombinations?.map(({ size, hair }) => (
                <Row gutter={[16, 16]} key={`${size.name}-${hair.name}`}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label='Tamanho'
                      name={`${size.id}-${hair.id}-size`}
                      initialValue={size.id}
                      rules={[
                        { required: true, message: 'Tamanho obrigatório.' },
                      ]}
                    >
                      <Select
                        options={[{ value: size.id, label: size.name }]}
                        value={size.id}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label='Pelagem'
                      name={`${size.id}-${hair.id}-hair`}
                      initialValue={hair.id}
                      rules={[
                        { required: true, message: 'Pelagem obrigatória.' },
                      ]}
                    >
                      <Select
                        options={[{ value: hair.id, label: hair.name }]}
                        value={hair.id}
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label='Duração'
                      name={`${size.id}-${hair.id}-executionTime`}
                      rules={[
                        { required: true, message: 'Duração obrigatória.' },
                      ]}
                    >
                      <Input placeholder='Duração' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      label='Preço'
                      name={`${size.id}-${hair.id}-price`}
                      rules={[
                        { required: true, message: 'Preço obrigatório.' },
                      ]}
                    >
                      <Input placeholder='Preço' />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
