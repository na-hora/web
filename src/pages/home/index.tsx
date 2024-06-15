import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h2>Essa é a página principal (na-hora.com)</h2>

      <p>
        Para acessar o dashboard, clique <Link to="dashboard">aqui</Link>
      </p>
      <p>
        Para acessar a página de cadastro da empresa, clique{" "}
        <Link to="company/register">aqui</Link>
      </p>
      <p>
        Para acessar a página de agendamento, clique{" "}
        <Link to="appointment">aqui</Link>
      </p>
    </div>
  )
}
