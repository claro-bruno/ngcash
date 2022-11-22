import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../context/AuthProvider'
import { getUserFromLocalStorage } from '../../context/AuthProvider/utils'

export default function ProtectedLayout({
  children,
}: {
  children: JSX.Element
}) {
  const { token, saveUser } = useContextSelector(
    AuthContext,
    (context) => context,
  )
  const navigate = useNavigate()
  useEffect(() => {
    const user = getUserFromLocalStorage()
    if (!user?.token) {
      navigate('/login')
    }
    if (user?.token) {
      saveUser(user)
    }
  }, [saveUser, navigate])
  // useEffect(() => {
  //   if (urlsProtected.includes(location.pathname) && access === 'CONTRACTOR') {
  //     navigate('/home')
  //     console.log('NAO TENHO ACESSO')
  //   }
  // }, [location, access, navigate])

  if (!token) {
    return null
  }
  return children
}
