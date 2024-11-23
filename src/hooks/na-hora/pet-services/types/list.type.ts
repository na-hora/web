export type PetService = {
  id: number
  name: string
  paralellism: number
  petTypes: Array<{ id: number; name: string }>
}

export type LoadPetServicesResponse = Array<PetService>
