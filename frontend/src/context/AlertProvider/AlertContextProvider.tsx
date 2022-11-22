import { PropsWithChildren, useState } from 'react'
import { createContext } from 'use-context-selector'
import AlertModal from '../../components/modals/AlertModal'
import useModal from '../../hooks/useModal'

interface AlertContext {
  getAlertMessage: (alert: { message: string }) => void
  changeAlertModalState: () => void
  isModalOpen: boolean
}
export const alertContext = createContext({} as AlertContext)

export default function AlertProvider({ children }: PropsWithChildren) {
  const { isModalOpen, switchModalView } = useModal()
  const [alertMessage, setAlertMessage] = useState({})

  function getAlertMessage(alert: { message: string }) {
    setAlertMessage(alert)
  }
  function changeAlertModalState() {
    switchModalView()
  }
  const valueToProvide = {
    getAlertMessage,
    changeAlertModalState,
    isModalOpen,
  }
  return (
    <alertContext.Provider value={valueToProvide}>
      {children}
      <AlertModal
        isModalOpen={isModalOpen}
        switchModalView={switchModalView}
        modalInfos={alertMessage}
      />
    </alertContext.Provider>
  )
}
