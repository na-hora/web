import { Button, Form } from "antd";

export const RegisterCompanyConfirmationForm = () => {
  return (
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Criar minha conta
      </Button>
    </Form.Item>
  );
};
