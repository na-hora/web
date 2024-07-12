import { isValid } from '@/utils/validate-cnpj'
import { Form, Input } from 'antd'
import { PatternFormat } from 'react-number-format'

export const RegisterCompanyForm = () => {
  const validateCNPJ = (_: any, value: string) => {
    const isCNPJValid = isValid(value)

    if (!isCNPJValid) {
      return Promise.reject(new Error('CNPJ inválido'))
    }
  }

  return (
    <>
      <h2>Vamos começar. Preencha os dados da sua empresa.</h2>

      <Form.Item
        label='Nome'
        name='name'
        rules={[{ required: true, message: 'Nome obrigatório' }]}
        required
      >
        <Input placeholder='Digite o nome da sua empresa' />
      </Form.Item>

      <Form.Item
        label='Nome fantasia'
        name='fantasyName'
        rules={[{ required: true, message: 'Nome fantasia obrigatório' }]}
        required
      >
        <Input placeholder='Digite o nome fantasia da sua empresa' />
      </Form.Item>

      <Form.Item
        label='CNPJ'
        name='cnpj'
        rules={[
          {
            required: true,
            message: 'CNPJ inválido',
            pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            validator: validateCNPJ,
          },
        ]}
        required
      >
        <PatternFormat
          placeholder='Digite o CNPJ da sua empresa'
          customInput={Input}
          format={'##.###.###/####-##'}
          required={true}
        />
      </Form.Item>

      <Form.Item
        label='Telefone'
        name='phone'
        rules={[
          {
            required: true,
            message: 'Telefone obrigatório',
            pattern: /^(\(\d{2}\)) (\d{5})-(\d{4})$/,
          },
        ]}
        required
      >
        <PatternFormat
          placeholder='Digite seu telefone'
          customInput={Input}
          format={'(##) #####-####'}
          required={true}
        />
      </Form.Item>
    </>
  )
}
