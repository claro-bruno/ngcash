import { Api } from '..'

import { User } from '../../types/user'

export async function axiosCreateUser(payload: User) {
  return await Api.post('user', JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
