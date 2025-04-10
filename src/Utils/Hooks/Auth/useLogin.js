"use client"
import { emailSchema, passwordSchema, YupObject } from "../../Validation/ValidationSchemas"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { requestV1 } from "../../AxiosUtils"
import { loginPath } from "../../AxiosUtils/API"
import { ToastNotification } from "../../CustomFunctions/ToastNotification"

export const LogInSchema = YupObject({
  email: emailSchema,
  password: passwordSchema,
})

const useLogin = () => {
  const router = useRouter()

  return useMutation(
    (data) =>
      requestV1(
        {
          url: loginPath,
          method: "post",
          data,
        },
        router,
      ),
    {
      onError: (error) => {
        const errorMessage = error.response?.data?.message || "Login failed"
        ToastNotification("error", errorMessage)
      },
    },
  )
}

export default useLogin