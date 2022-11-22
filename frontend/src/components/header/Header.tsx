import { SignOut } from 'phosphor-react'
import { PropsWithChildren } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../context/AuthProvider'
import Logo from '../../assets/unnamed.webp'
import './header.css'
export default function Header(props: PropsWithChildren) {
  const navigate = useNavigate()
  const { logout } = useContextSelector(AuthContext, (context) => context)
  // const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }
  return (
    <header className=" p-2 flex justify-between bg-brand">
      <div className="">
        <img
          className="h-16"
          src={Logo}
          alt="global janitorial services logo"
        />
      </div>
      {props.children}
      {
        <button title="Logout" onClick={handleLogout} className="loginLink">
          <SignOut size={22} />
        </button>
      }
    </header>
  )
}
