import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import logo from '../../assets/logo.jpg'
import imagem from '../../assets/img.svg'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useContextSelector } from 'use-context-selector'
import LoadingSpinner from '../../components/LoadingSpinner'
import { alertContext } from '../../context/AlertProvider/AlertContextProvider'
import { AuthContext } from '../../context/AuthProvider'
// import useModal from '../../hooks/useModal'
// import RecoveryPassword from './RecoveryPasswordComponent/RecoveryPassword'

export type UserLogin = {
  username: string
  password: string
}

export default function Login() {
  const { changeAlertModalState, getAlertMessage } = useContext(alertContext)
  const { authenticate, saveUser, checkUserInLocalStorage } =
    useContextSelector(AuthContext, (context) => context)
  const { register, handleSubmit, watch } = useForm<UserLogin>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const username = watch('username')
  const password = watch('password')
  const navigate = useNavigate()
  // const { isModalOpen, switchModalView } = useModal()
  useEffect(() => {
    if (checkUserInLocalStorage()) {
      navigate('/home')
    }
  }, [checkUserInLocalStorage, navigate])

  const { mutateAsync, isLoading } = useMutation(
    (payload: UserLogin) => authenticate(payload.username, payload.password),
    {
      onSuccess: (response) => {
        saveUser(response.data)
        navigate('/home')
      },
      onError: (error: { response: any }) => {
        console.log(error.response?.data)
        getAlertMessage({
          message: error.response?.data,
        })
        changeAlertModalState()
      },
    },
  )

  function handleLogin(payload: UserLogin) {
    mutateAsync(payload)
  }
  return (
    <div className="flex  min-w-screen min-h-screen">
      <div className="flex-1 flex items-center flex-col object-cover justify-center  bg-brand ">
        <h1 className=" uppercase leading-4 relative bottom-24 font-extrabold text-4xl font-['Poppins'] text-gray-200">
          NGCASH
        </h1>
        <img
          className="w-[99%] object-cover rounded shadow-md"
          src={imagem}
          alt="workers smiling"
        />
      </div>
      <div className="flex-1 flex flex-col w-[100%] bg-gray-100 min-h-full  items-center  ">
        <div className="flex items-center mt-[10vh]  gap-2 flex-col">
          <img
            className="h-[12rem] object-contain"
            src={logo}
            alt="globaljanitorialservices logo"
          />
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col items-center justify-center gap-4 px-4 h-72 w-auto"
          >
            <label className="labelsDefault">
              Username
              <input
                {...register('username')}
                className="inputsDefault"
                type="text"
              />
            </label>
            <label className="labelsDefault">
              Password
              <input
                {...register('password')}
                className="inputsDefault"
                type="password"
              />
            </label>
            <button
              disabled={!username || password.length < 5 || isLoading}
              className="buttonStyle2 px-3"
              type="submit"
            >
              {isLoading ? <LoadingSpinner css="w-8 h-8" /> : 'Sign in'}
            </button>
          </form>
          <span className="text-sm mt-2 text-gray-400">
            Don&apos;t have an account ?{' '}
            {
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            }
          </span>
          {/* <span className="text-sm mt-2 text-gray-400">
            Forgot your password ?{' '}
            {
              <button className="text-blue-500" onClick={switchModalView}>
                Recover
              </button>
            }
          </span> */}
        </div>
        {/* <RecoveryPassword
          isModalOpen={isModalOpen}
          switchModalView={switchModalView}
        /> */}
      </div>
    </div>
  )
}
