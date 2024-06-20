import { Form, Input } from "antd";
import { PatternFormat } from "react-number-format";

export const RegisterCompanyForm = () => {
  return (
    <>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Nome obrigatório" }]}
        required
      >
        <Input placeholder="Digite o nome da sua empresa" />
      </Form.Item>

      <Form.Item
        label="Nome fantasia"
        name="fantasyName"
        rules={[{ required: true, message: "Nome fantasia obrigatório" }]}
        required
      >
        <Input placeholder="Digite o nome fantasia da sua empresa" />
      </Form.Item>

      <Form.Item
        label="CNPJ"
        name="cnpj"
        rules={[
          {
            required: true,
            message: "CNPJ obrigatório",
            pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
          },
        ]}
        required
      >
        <PatternFormat
          placeholder="Digite o CNPJ da sua empresa"
          customInput={Input}
          format={"##.###.###/####-##"}
          required={true}
        />
      </Form.Item>

      <Form.Item
        label="Telefone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Telefone obrigatório",
            pattern: /^(\(\d{2}\)) (\d{5})-(\d{4})$/,
          },
        ]}
        required
      >
        <PatternFormat
          placeholder="Digite seu telefone"
          customInput={Input}
          format={"(##) #####-####"}
          required={true}
        />
      </Form.Item>
    </>
  );
};
