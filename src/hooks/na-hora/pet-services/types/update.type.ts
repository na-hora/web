export type UpdatePetServiceRequestBody = {
  name: string
  paralellism: number
  configurations: {
    price: number
    executionTime: number
    companyPetSizeID: number
    companyPetHairID: number
  }[]
}
