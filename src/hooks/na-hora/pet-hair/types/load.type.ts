export type PetHair = {
  id: number
  name: string
  companyPetTypeId: number
  companyPetTypeName: string
}

export type LoadPetHairsResponse = Array<PetHair>
