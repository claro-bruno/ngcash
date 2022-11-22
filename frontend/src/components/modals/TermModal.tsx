import { Dialog, Transition } from '@headlessui/react'
import { WarningCircle } from 'phosphor-react'
import { ChangeEvent, Fragment, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '../../context/AuthProvider'
import { ModalProps } from '../../types/modal'
import './modal.css'

type TermModalProps = ModalProps & { title: string; pdfUrl: string }
export default function TermModal({
  title,
  pdfUrl,
  isModalOpen,
  switchModalView,
}: TermModalProps) {
  const [isChecked, setIsChecked] = useState(false)
  const { access } = useContextSelector(AuthContext, (context) => context)
  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked)
  }
  function handleClose() {
    switchModalView()
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                <Dialog.Panel className="termModal">
                  <div
                    tabIndex={0}
                    className="flex items-center focus:outline-none justify-center"
                  >
                    <WarningCircle size={42} color="red" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center py-4 font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 flex items-center justify-center">
                    <iframe
                      src={`${pdfUrl}#toolbar=0`}
                      height="800vh"
                      width="100%"
                    ></iframe>
                  </div>

                  {!access ? (
                    <div className="pt-7 flex flex-col items-center gap-5">
                      <label className="flex items-center text-sm gap-3">
                        <input
                          onChange={handleCheckboxChange}
                          className="form-radio-input h-4 w-4 "
                          type="checkbox"
                        />
                        I declare that I have read and am aware that I must
                        comply with the rules contained in the regulation.
                      </label>
                      <button
                        disabled={!isChecked}
                        type="button"
                        className="buttonStyle1 text-sm px-4"
                        onClick={handleClose}
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    <div className="pt-7 flex flex-col items-center gap-5">
                      <button
                        type="button"
                        className="buttonStyle1 text-sm px-4"
                        onClick={handleClose}
                      >
                        close
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
