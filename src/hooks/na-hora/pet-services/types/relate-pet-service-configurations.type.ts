export type PetServiceConfiguration = {
  price: number
  executionTime: number
  companyPetSizeId: number
  companyPetHairId: number
}

export type RelatePetServiceConfigurationsRequestBody = {
  relations: PetServiceConfiguration[]
}
