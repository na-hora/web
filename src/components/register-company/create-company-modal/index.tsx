import { Modal } from "antd"
import { PulseLoader } from "react-spinners"

export const CreateCompanyModal = () => {
  const isLoading = false

  return (
    <Modal
      open={isLoading}
      closeIcon={false}
      centered
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          paddingBottom: "20px",
        },
        mask: { backdropFilter: "blur(15px)" },
        content: { backgroundColor: "#ffffff70", boxShadow: "none" },
      }}
      footer={null}
    >
      <h2>Aguarde um instante, estamos processando seu cadastro</h2>
      <PulseLoader color="blue" speedMultiplier={0.5} />
    </Modal>
  )
}
