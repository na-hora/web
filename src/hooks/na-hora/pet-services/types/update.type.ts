export type UpdatePetServiceRequestBody = {
  name: string
  paralellism: number
  petTypes: Array<{ id: number; name: string }>
}
