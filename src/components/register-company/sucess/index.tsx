import { Button, Result } from "antd";

export const SuccessCompanyRegister = () => {
  return (
    <Result
      icon={<img src="/logo.svg" alt="" style={{ width: "150px" }} />}
      title={<h3>Parabéns! Seu cadastro foi concluído com sucesso!</h3>}
      extra={
        <div>
          <p>
            Acesse seu e-mail e clique no link de acesso para acessar sua conta
            ou clique no botão abaixo para acessar o painel.
          </p>
          <Button type="primary" key="console" href="/dashboard">
            Ir para o painel
          </Button>
        </div>
      }
    />
  );
};
