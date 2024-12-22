import { useLoadPetTypes } from '@/hooks/na-hora/pet-type/use-load-pet-types'
import { useAppointmentContext } from '@/pages/appointment/contexts/appointments-provider'
import { Form, Select } from 'antd'
// import styles from './styles.module.css'

export const AnimalInfoForm = () => {
  const { petType, setPetType } = useAppointmentContext()

  const { data: petTypes } = useLoadPetTypes(
    '5478b7e4-2469-40b5-ad26-2c4b9490c178',
  )

  return (
    <>
      <h2>Vamos começar. Primeiro, informe os dados do seu animal</h2>

      <Form.Item
        label='Tipo'
        name='pet_type'
        rules={[
          {
            required: true,
            message: 'CEP obrigatório',
          },
        ]}
        required
        style={{ marginBottom: 0 }}
      >
        <Select
          // style={{ width: 120 }}
          value={petType}
          onChange={(value: number) => setPetType(value)}
        >
          {petTypes?.map((option, index) => (
            <Select.Option value={option.id} key={index}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label='Tipo'
        name='pet_type'
        rules={[
          {
            required: true,
            message: 'CEP obrigatório',
          },
        ]}
        required
        style={{ marginBottom: 0 }}
      >
        <Select
          // style={{ width: 120 }}
          value={petType}
          onChange={(value: number) => setPetType(value)}
        >
          {petTypes?.map((option, index) => (
            <Select.Option value={option.id} key={index}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
