import { ChangeEvent, useState } from 'react'

export default function useHandleChange<t>(initialState: t) {
  const [state, setState] = useState<t>(initialState)
  const [inputsFiles, setInputsFiles] = useState<t>(initialState)
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    checkbox = false,
  ) {
    if (checkbox) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      })
    } else
      setState({
        ...state,
        [event.target.name]: event.target.value,
      })
  }
  function handleInputsFiles(
    e: ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) {
    setInputsFiles({ ...inputsFiles, [inputName]: e.target.files![0] })
  }
  return { state, handleChange, inputsFiles, handleInputsFiles }
}
