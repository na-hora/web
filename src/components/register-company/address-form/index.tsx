import { useRegisterCompanyContext } from '@/pages/company/contexts/register-company-provider'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PatternFormat } from 'react-number-format'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

type ViaCEPResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
} | null

export const RegisterCompanyAddressForm = () => {
  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState<ViaCEPResponse>(null)
  const { form, registerCompanyFormData, setRegisterCompanyFormData } =
    useRegisterCompanyContext()

  useEffect(() => {
    form.setFieldValue('zipCode', registerCompanyFormData.zipCode)
  }, [form, registerCompanyFormData.zipCode])

  const fillFormWithAddress = (addressData: ViaCEPResponse) => {
    form.setFieldsValue({
      neighborhood: addressData?.bairro,
      street: addressData?.logradouro,
      city: addressData?.localidade,
      state: addressData?.uf,
    })
  }

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode.replace(/\D/g, '')}/json/`,
      )

      if (response.data?.erro) {
        throw new Error('CEP inválido')
      }

      setAddress(response.data)
      fillFormWithAddress(response.data)
      setRegisterCompanyFormData((prev) => ({
        ...prev,
        cityIbge: response.data.ibge,
      }))
    } catch (error) {
      form.setFields([
        {
          name: 'zipCode',
          errors: ['CEP inválido'],
        },
      ])
      form.resetFields(['state', 'cityIbge', 'neighborhood', 'street'])
    }
  }

  const searchOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      fetchAddress()
    }
  }

  return (
    <>
      <h2>Agora, preencha os dados de endereço da sua empresa.</h2>

      <Form.Item
        label='CEP'
        name='zipCode'
        rules={[
          {
            required: true,
            message: 'CEP obrigatório',
            pattern: /^(\d{2}).(\d{3})-(\d{3})$/,
          },
        ]}
        required
        style={{ marginBottom: 0 }}
      >
        <PatternFormat
          placeholder='Digite o CEP da sua empresa'
          onChange={(e) => setZipCode(e.target.value)}
          customInput={Input}
          format={'##.###-###'}
          required={true}
          className={styles.input}
          onKeyDown={searchOnEnter}
          addonAfter={
            <Button
              type='primary'
              onClick={fetchAddress}
              className={styles.button}
            >
              Buscar endereço
            </Button>
          }
        />
      </Form.Item>

      <div style={{ textAlign: 'start', marginBottom: '15px' }}>
        <Link
          to='https://buscacepinter.correios.com.br/app/endereco/index.php'
          target='_blank'
        >
          Não sei meu CEP
        </Link>
      </div>

      <Form.Item
        label='Estado'
        name='state'
        rules={[{ required: true, message: 'Estado obrigatório' }]}
        required
      >
        <Input placeholder='Digite o estado' disabled />
      </Form.Item>

      <Form.Item
        label='Cidade'
        name='city'
        rules={[{ required: true, message: 'Cidade obrigatória' }]}
        required
      >
        <Input
          placeholder='Digite a cidade'
          disabled
          value={address?.localidade}
        />
      </Form.Item>

      <Form.Item
        label='Bairro'
        name='neighborhood'
        rules={[{ required: true, message: 'Bairro obrigatório' }]}
        required
      >
        <Input
          placeholder='Digite o bairro'
          disabled={address?.localidade && !address?.bairro ? false : true}
        />
      </Form.Item>

      <Form.Item
        label='Rua'
        name='street'
        rules={[{ required: true, message: 'Rua obrigatória' }]}
        required
      >
        <Input
          placeholder='Digite a rua'
          disabled={address?.localidade && !address?.logradouro ? false : true}
        />
      </Form.Item>

      <Form.Item
        label='Número'
        name='number'
        rules={[{ required: true, message: 'Número obrigatório' }]}
        required
      >
        <Input placeholder='Digite o número' />
      </Form.Item>

      <Form.Item label='Complemento' name='complement'>
        <Input placeholder='Digite o complemento' />
      </Form.Item>
    </>
  )
}
