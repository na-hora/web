export type CreatePetServiceRequestBody = {
  name: string
  paralellism: number
  configurations: {
    price: number
    executionTime: number
    companyPetSizeID: number
    companyPetHairID: number
  }[]
}
