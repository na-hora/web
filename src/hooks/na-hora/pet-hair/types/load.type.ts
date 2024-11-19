export type PetHair = {
  id: number
  name: string
  description?: string
  companyPetTypeId: number
  companyPetTypeName: string
}

export type LoadPetHairsResponse = Array<PetHair>
