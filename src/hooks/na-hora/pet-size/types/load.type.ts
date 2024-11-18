export type PetSize = {
  id: number
  name: string
  companyPetTypeId: number
  companyPetTypeName: string
}

export type LoadPetSizesResponse = Array<PetSize>
