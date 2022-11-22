import { Api } from '..'
import { IFilter } from '../../types/helpers'

export async function axiosGetAllTransaction({ id, filter }: IFilter) {
  return await Api.get('transaction', { params: { id, filter } })
}
export async function axiosCreateTransaction(payload: any) {
  // console.log(payload)
  return await Api.post('transaction', JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
