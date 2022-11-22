import { Api } from '..'
import { Account } from '../../types/account'

export async function axiosGetAllClients() {
  return await Api.get('client')
}

export async function axiosGetBalance(payload: Partial<Account>) {
  const id = payload.id
  delete payload.id
  return await Api.get(`account/${id}`, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
