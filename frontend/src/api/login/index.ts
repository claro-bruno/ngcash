import { Api } from '..'
import { User } from '../../types/user'

export async function axiosLogin(payload: User) {
  return await Api.post('user/authenticate', JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
