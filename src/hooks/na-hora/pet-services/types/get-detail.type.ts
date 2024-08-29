export type LoadPetServiceDetailResponse = {
  id: number
  name: string
  paralellism: number
  configurations: {
    id: number
    companyPetHairId: number
    companyPetSizeId: number
    price: number
    executionTime: number
  }[]
}
