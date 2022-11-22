import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { axiosCreateUser } from "../../../api/user";
import useHandleChange from "../../../hooks/useHandleChange";
import useModal from "../../../hooks/useModal";
import { User } from "../../../types/user";
import AlertModal from "./AlertModal";

export default function NewContractorForm() {
  const { register, handleSubmit, watch, reset } = useFormContext()
  const [response, setResponse] = useState<any>({})
  const { isModalOpen, switchModalView } = useModal()

  const { mutateAsync } = useMutation(
    (payload: [User]) =>
      axiosCreateUser(payload),
    {
      onSuccess: (response) => {
        setResponse({ isContractorCreated: true, ...response?.data })
        switchModalView()
        reset()
      },
      onError: (error: { response: any }) => {
        setResponse({
          isContractorCreated: false,
          message: error.response.data.message,
        })
        switchModalView()
      }
    },
  )

  function handleSubmitNewUser(userInfo: any) {
    mutateAsync(userInfo)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitNewUser)}
        className="flex flex-col items-center justify-center gap-4 px-4  w-auto"
      >
        <div className="flex flex-col  bg-gray-200 mt-8 p-8 rounded-md">
          <div className="inputsAndLabelsContainer h-[18rem] border-b-2">
            <div className="flex flex-col gap-2">
              <label className="labelsDefault">
                Username *
                <input
                  className="inputsDefault"
                  type="text"
                  {...register('username')}
                  required
                />
              </label>
              <label className="labelsDefault">
                Password *
                <input
                  className="inputsDefault"
                  type="password"
                  {...register('password')}
                  required
                />
              </label>
            </div>
          </div>
        <button
          className="bg-brand mt-3 px-3 py-1 ring ring-transparent border border-transparent hover:ring-brand hover:border-gray-50 rounded relative bottom-3 transition-colors text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:ring-transparent"
          type="submit"
        >
            Register
        </button>
        </div>
      </form>
      <AlertModal
        isModalOpen={isModalOpen}
        switchModalView={switchModalView}
        modalInfos={response}
      />
    </>
  );
}
