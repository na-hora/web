export type PetSize = {
  id: number
  name: string
  description?: string
  companyPetTypeId: number
  companyPetTypeName: string
}

export type LoadPetSizesResponse = Array<PetSize>
