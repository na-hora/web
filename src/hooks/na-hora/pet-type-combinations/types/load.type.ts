export type PetTypeCombination = {
  id: number
  name: string
}

export type LoadPetTypeCombinationsResponse = Array<{
  hair: PetTypeCombination
  size: PetTypeCombination
}>
