import { Dialog, Transition } from '@headlessui/react'
import { Warning } from 'phosphor-react'
import { Fragment } from 'react'
import { ModalProps } from '../../types/modal'

export default function AlertModal({
  isModalOpen,
  switchModalView,
  modalInfos,
}: ModalProps) {
  console.log(modalInfos)

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
                    className="text-xl text-center py-4 font-medium leading-6 text-gray-900"
                  >
                    Warning!
                  </Dialog.Title>
                  <div className="mt-2 font-semibold text-2xl flex items-center justify-center">
                    <p className="text-lg text-gray-500">
                      {modalInfos?.message?.message}
                    </p>
                  </div>

                  <div className="pt-7 flex justify-evenly">
                    <button
                      type="button"
                      className="px-3 buttonStyle1 self-center"
                      onClick={switchModalView}
                    >
                      Close
                    </button>
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
