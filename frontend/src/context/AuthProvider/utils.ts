import { User } from '../../types/authProvider'

export function setUserToLocalStorage(user: User) {
  localStorage.setItem('u/ngcash', JSON.stringify(user))
}
export function getUserFromLocalStorage() {
  const json = localStorage.getItem('u/ngcash')
  if (!json) {
    return null
  }
  const user = JSON.parse(json)
  return user ?? null
}
export function removeUserFromLocalStorage() {
  localStorage.removeItem('u/ngcash')
}
