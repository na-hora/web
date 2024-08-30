export type CreateCompanyRequestBody = {
  name: string
  paralellism: number
  configurations: {
    price: number
    executionTime: number
    companyPetSizeID: number
    companyPetHairID: number
  }[]
}
