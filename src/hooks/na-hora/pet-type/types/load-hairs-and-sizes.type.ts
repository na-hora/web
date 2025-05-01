export type PetHairOrSize = {
  id: number
  name: string
  description?: string
}

export type LoadHairsAndSizesByTypeResponse = {
  hairs: Array<PetHairOrSize>
  sizes: Array<PetHairOrSize>
}
