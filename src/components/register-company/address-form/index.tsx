import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";
// import { useLoadViaCepCep } from "../../../hooks/providers/viacep/use-load-cep"
import { useRegisterCompanyContext } from "../../../pages/company/contexts/register-company-provider";

type ViaCEPResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
} | null;

export const RegisterCompanyAddressForm = () => {
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState<ViaCEPResponse>(null);
  const { form } = useRegisterCompanyContext();

  // const { data, isFetched } = useLoadViaCepCep()

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode.replace(/\D/g, "")}/json/`
      );

      if (response.data?.erro) {
        throw new Error("CEP inválido");
      }

      setAddress(response.data);
    } catch (error) {
      form.setFields([
        {
          name: "zipCode",
          errors: ["CEP inválido"],
        },
      ]);
      form.resetFields(["state", "cityIbge", "neighborhood", "street"]);
    }
  };

  useEffect(() => {
    if (address) {
      const mappedAddress = {
        state: address.uf,
        cityIbge: address.ibge,
        neighborhood: address.bairro,
        street: address.logradouro,
      };

      form.setFieldsValue(mappedAddress);
    }
  }, [address, form]);

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
        name="cityIbge"
        rules={[{ required: true, message: "Cidade obrigatória" }]}
        required
      >
        <Input
          placeholder="Digite a cidade"
          disabled
          value={address?.localidade}
        />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="neighborhood"
        rules={[{ required: true, message: "Bairro obrigatório" }]}
        required
      >
        <Input
          placeholder="Digite o bairro"
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
          placeholder="Digite a rua"
          disabled={address?.localidade && address?.logradouro ? false : true}
        />
      </Form.Item>

      <Form.Item
        label="Número"
        name="number"
        rules={[{ required: true, message: "Número obrigatório" }]}
        required
      >
        <InputNumber
          min={0}
          placeholder="Digite o número"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Complemento" name="complement">
        <Input placeholder="Digite o complemento" />
      </Form.Item>
    </>
  );
};
