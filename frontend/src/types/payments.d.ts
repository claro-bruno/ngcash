export type Payment = {
  fk_id_contractor: number
  name: string
  month: string
  year: number
  payments: {
    method: string
    identifier: string
    quarter: number
    value: number
    taxes: number
  }[]
}
