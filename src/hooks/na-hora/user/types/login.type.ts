type Company = {
  id: string
  fantasyName: string
  avatarUrl: string
  petSizes: Array<{ id: number; name: string }>
  petHairs: Array<{ id: number; name: string }>
}

export type LoginUserResponse = {
  id: string
  token: string
  company: Company
}

export type LoginUserRequestBody = {
  username: string
  password: string
}
