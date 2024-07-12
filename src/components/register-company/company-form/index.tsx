import { isValid } from '@/utils/validate-cnpj'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Form, Input, Tooltip } from 'antd'
import { PatternFormat } from 'react-number-format'

export const RegisterCompanyForm = () => {
  const validateCNPJ = (_: any, value: string) => {
    const isCNPJValid = isValid(value)

    if (!isCNPJValid) {
      return Promise.reject(new Error('CNPJ inválido'))
    }

    return Promise.resolve()
  }

  const requiredRules = [{ required: true, message: 'Campo obrigatório' }]

  return (
    <>
      <h2>Vamos começar. Preencha os dados da sua empresa.</h2>

      <Form.Item
        label={
          <Tooltip
            title='Nome de registro da sua empresa utilizado em documentos legais'
            placement='right'
          >
            Razão social <QuestionCircleOutlined />
          </Tooltip>
        }
        name='name'
        rules={requiredRules}
        required
      >
        <Input placeholder='Digite o nome da sua empresa' />
      </Form.Item>

      <Form.Item
        label={
          <Tooltip
            title='Nome que será exibido para os clientes'
            placement='right'
          >
            Nome fantasia <QuestionCircleOutlined />
          </Tooltip>
        }
        name='fantasyName'
        rules={requiredRules}
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
        rules={[...requiredRules, { pattern: /^(\(\d{2}\)) (\d{5})-(\d{4})$/ }]}
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
