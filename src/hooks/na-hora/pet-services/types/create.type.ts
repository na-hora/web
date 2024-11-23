export type CreatePetServiceRequestBody = {
  name: string
  paralellism: number
  petTypes: Array<{ id: number; name: string }>
}
