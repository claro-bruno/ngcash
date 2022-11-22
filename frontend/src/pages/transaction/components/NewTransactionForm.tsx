import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'
import { axiosCreateTransaction } from '../../../api/transactions'
import { AuthContext } from '../../../context/AuthProvider'
// import useHandleChange from '../../../hooks/useHandleChange'
import useModal from '../../../hooks/useModal'
import { Transaction } from '../../../types/transaction'
import AlertModal from './AlertModal'

export default function NewTransactionForm() {
  const { register, handleSubmit, watch, reset } = useFormContext()
  const [response, setResponse] = useState<any>({})
  const { isModalOpen, switchModalView } = useModal()

  const { accountId } = useContextSelector(
    AuthContext,
    (context: any) => context,
  )
  const { mutateAsync } = useMutation(
    (payload: [Transaction]) => axiosCreateTransaction(payload),
    {
      onSuccess: (response) => {
        setResponse({ isTransactionCreated: true, ...response?.data })
        switchModalView()
        reset()
      },
      onError: (error: { response: any }) => {
        setResponse({
          isTransactionCreated: false,
          message: error.response.data.message,
        })
        reset()
        switchModalView()
      },
    },
  )

  function handleSubmitNewTransaction(transactionInfo: any) {
    transactionInfo.accountId = accountId
    mutateAsync(transactionInfo)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitNewTransaction)}
        className="flex flex-col items-center justify-center gap-4 px-4  w-auto"
      >
        <div className="flex flex-col  bg-gray-200 mt-8 p-8 rounded-md">
          <div className="inputsAndLabelsContainer h-[18rem] border-b-2">
            <div className="flex flex-col gap-2">
              <label className="labelsDefault">
                Username
                <input
                  className="inputsDefault"
                  type="text"
                  {...register('username')}
                  required
                />
              </label>
              <label className="labelsDefault">
                Valor *
                <input
                  className="inputsDefault"
                  type="number"
                  {...register('value')}
                  required
                />
              </label>
            </div>
          </div>
          <button
            className="bg-brand mt-3 px-3 py-1 ring ring-transparent border border-transparent hover:ring-brand hover:border-gray-50 rounded relative bottom-3 transition-colors text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:ring-transparent"
            type="submit"
          >
            Transferir
          </button>
        </div>
      </form>
      {
        <Link className="text-blue-500" to="/home">
          Voltar a pagina Inicial
        </Link>
      }
      <AlertModal
        isModalOpen={isModalOpen}
        switchModalView={switchModalView}
        modalInfos={response}
      />
    </>
  )
}
