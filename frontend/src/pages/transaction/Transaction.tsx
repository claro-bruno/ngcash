import { FormProvider, useForm } from 'react-hook-form'
import Header from '../../components/header/Header'
import AlertModal from './components/AlertModal'
import useModal from '../../hooks/useModal'
import { Transaction } from '../../types/transaction'
import NewTransactionForm from './components/NewTransactionForm'

export const INITIAL_NEW_TRANSACTION_STATE: Transaction = {
  username: '',
  accountId: '',
  value: 0,
}

export default function Register() {
  const { switchModalView, isModalOpen } = useModal()

  const newTransactionForm = useForm<Transaction>({
    defaultValues: INITIAL_NEW_TRANSACTION_STATE,
  })
  return (
    <div className="flex flex-col  min-w-screen min-h-screen">
      <Header />
      <main className="flex flex-col my-auto gap-2 w-[100%]  min-h-full  items-center  ">
        <FormProvider {...newTransactionForm}>
          <NewTransactionForm />
        </FormProvider>
        <AlertModal
          isModalOpen={isModalOpen}
          switchModalView={switchModalView}
        />
      </main>
    </div>
  )
}
