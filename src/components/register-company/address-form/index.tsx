import { Form, Input } from "antd";
import { PatternFormat } from "react-number-format";
// import { useLoadViaCepCep } from "../../../hooks/providers/viacep/use-load-cep";

export const RegisterCompanyAddressForm = () => {
  // const { data: cepData } = useLoadViaCepCep("89160925");

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
          customInput={Input}
          format={"##.###-###"}
          required={true}
        />
      </Form.Item>

      <Form.Item
        label="Estado"
        name="state"
        rules={[{ required: true, message: "Estado obrigatório" }]}
        required
      >
        <Input placeholder="Digite o estado" />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="cityId"
        rules={[{ required: true, message: "Cidade obrigatória" }]}
        required
      >
        <Input placeholder="Digite a cidade" />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name="neighborhood"
        rules={[{ required: true, message: "Bairro obrigatório" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rua"
        name="street"
        rules={[{ required: true, message: "Rua obrigatória" }]}
        required
      >
        <Input />
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
  );
};
