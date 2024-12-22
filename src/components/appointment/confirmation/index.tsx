export const Confirmation = () => {
  return (
    <div>
      <h1>Verifique seu e-mail para confirmar o agendamento!</h1>

      <p>
        Enviamos os dados do seu agendamento e um link de confirmação para o seu
        e-mail. Por favor, clique nele para finalizar seu agendamento.
      </p>
      <strong style={{ color: 'red', fontSize: '1.2rem' }}>Atenção:</strong>
      <p>
        O seu horário permanecerá reservado, <strong>mas não confirmado</strong>
        , até que você faça esta confirmação através do link.
      </p>
    </div>
  )
}
