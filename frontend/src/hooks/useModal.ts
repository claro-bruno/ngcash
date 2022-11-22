import { useState } from 'react'

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function switchModalView() {
    setIsModalOpen(!isModalOpen)
  }

  return {
    isModalOpen,
    switchModalView,
  }
}
