export type SpecificPetService = {
  id: number
  name: string
  price: number
  executionTime: number
  serviceValueId: number
}

export type LoadSpecificsPetServicesResponse = {
  services: Array<SpecificPetService>
}
