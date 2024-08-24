type BaseDataParams = {
  dynamicRoute?: string
  queryParams?: string
}

export type TGetDataParams = BaseDataParams

export type TPostDataParams<TBody> = {
  body?: TBody
} & BaseDataParams

export type TPutDataParams<TBody> = {
  body?: TBody
} & BaseDataParams

export type TDeleteDataParams = BaseDataParams
