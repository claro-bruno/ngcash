import { FormProvider, useForm } from 'react-hook-form'
import Header from '../../components/header/Header'
import AlertModal from './components/AlertModal'
import useModal from '../../hooks/useModal'
import { User } from '../../types/user'
import NewContractorForm from './components/NewContractorForm'

export const INITIAL_NEW_USER_STATE: User = {
  username: '',
  password: '',
}

export default function Register() {
  const { switchModalView, isModalOpen } = useModal()

  const newContractorForm = useForm<User>({
    defaultValues: INITIAL_NEW_USER_STATE,
  })
  return (
    <div className="flex flex-col  min-w-screen min-h-screen">
      <Header />
      <main className="flex flex-col my-auto gap-2 w-[100%]  min-h-full  items-center  ">
        <FormProvider {...newContractorForm}>
          <NewContractorForm />
        </FormProvider>
        <AlertModal
          isModalOpen={isModalOpen}
          switchModalView={switchModalView}
        />
      </main>
    </div>
  )
}
