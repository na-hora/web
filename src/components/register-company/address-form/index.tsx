import { Button, Form, Input } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { PatternFormat } from "react-number-format"
import { Link } from "react-router-dom"
// import { useLoadViaCepCep } from "../../../hooks/providers/viacep/use-load-cep"
import { useRegisterCompanyContext } from "../../../pages/company/contexts/register-company-provider"

type ViaCEPREsponse = {
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
  const [zipCode, setZipCode] = useState("")
  const [address, setAddress] = useState<ViaCEPREsponse>(null)
  const { form } = useRegisterCompanyContext()

  // const { data, isFetched } = useLoadViaCepCep()

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`
      )
      setAddress(response.data)
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error)
    }
  }

  // useEffect(() => {
  //   if (/^\d{2}\.\d{3}-\d{3}$/.test(zipCode)) {
  //     console.log("fetch")
  //     fetchAddress()
  //   }

  //   fetchAddress()
  // }, [zipCode])

  useEffect(() => {
    if (address) {
      const mappedAddress = {
        state: address.uf,
        cityId: address.localidade,
        neighborhood: address.bairro,
        street: address.logradouro,
      }

      form.setFieldsValue(mappedAddress)
    }
  }, [address])

  return (
    <>
      <Form.Item
        label="CEP"
        name="zipCode"
        rules={[
          {
            required: true,
            message: "CEP obrigatório",
            pattern: /^(\d{2}).(\d{3})-(\d{3})$/,
          },
        ]}
        required
      >
        <PatternFormat
          placeholder="Digite o CEP da sua empresa"
          onChange={(e) => setZipCode(e.target.value)}
          customInput={Input}
          format={"##.###-###"}
          required={true}
          addonAfter={<Button onClick={fetchAddress}>Buscar endereço</Button>}
        />
      </Form.Item>

      <Link
        to="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
      >
        Não sei meu CEP
      </Link>

      <Form.Item
        label="Estado"
        name="state"
        rules={[{ required: true, message: "Estado obrigatório" }]}
        required
      >
        <Input placeholder="Digite o estado" disabled />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="cityId"
        rules={[{ required: true, message: "Cidade obrigatória" }]}
        required
      >
        <Input placeholder="Digite a cidade" disabled />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="neighborhood"
        rules={[{ required: true, message: "Bairro obrigatório" }]}
        required
      >
        <Input
          disabled={address?.localidade && !address?.bairro ? false : true}
        />
      </Form.Item>

      <Form.Item
        label="Rua"
        name="street"
        rules={[{ required: true, message: "Rua obrigatória" }]}
        required
      >
        <Input
          disabled={address?.localidade && !address?.logradouro ? false : true}
        />
      </Form.Item>

      <Form.Item
        label="Número"
        name="number"
        rules={[{ required: true, message: "Número obrigatório" }]}
        required
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item label="Complemento" name="complement">
        <Input />
      </Form.Item>
    </>
  )
}
