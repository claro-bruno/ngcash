import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { Warning } from 'phosphor-react'
import { FormEvent, Fragment } from 'react'
import { useContext } from 'use-context-selector'
import { axiosCreateTransaction } from '../../../../api/transactions'
// import { axiosRecoveryPassword } from '../../../api/contractor'
import {
  alertContext,
  alertTransaction,
} from '../../../../context/AlertProvider/AlertContextProvider'
// import { alertContext } from ' /../../context/AlertProvider/AlertContextProvider'
import useHandleChange from '../../../../hooks/useHandleChange'
import { ModalProps } from '../../../../types/modal'

export default function RecoveryPassword({
  isModalOpen,
  switchModalView,
}: ModalProps) {
  const { state, handleChange } = useHandleChange({ username: '' })
  const { changeAlertModalState, getAlertMessage } = useContext(alertContext)
  const { mutateAsync, data } = useMutation(axiosCreateTransaction, {
    onError: (error: { response: any }) => {
      console.log(error.response?.data)
      getAlertMessage({
        message: error.response?.data,
      })
      changeAlertModalState()
    },
    onSuccess: () => {
      getAlertMessage({
        message: data?.data.message,
      })
      changeAlertModalState()
      switchModalView()
    },
  })
  function handleSubmit(e: FormEvent<EventTarget>) {
    e.preventDefault()
    mutateAsync(state)
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={switchModalView}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-center">
                    <Warning size={36} color={'red'} />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center py-4 font-medium leading-6 text-gray-900 italic"
                  >
                    Making Transactions.
                  </Dialog.Title>
                  <div className="mt-2 font-semibold text-2xl flex items-center justify-center flex-col gap-4">
                    <p className="italic text-center text-sm font-medium text-gray-500 w-[70%]">
                      Enter the username and the value that you want to transfer
                    </p>
                    <form onSubmit={handleSubmit}>
                      <input
                        name="username"
                        className="inputsDefault"
                        onChange={handleChange}
                        value={state.username}
                        type="text"
                        required
                      />
                      <div className="pt-7 flex justify-evenly">
                        <button
                          type="submit"
                          className="px-3 buttonStyle1 text-sm self-center"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
