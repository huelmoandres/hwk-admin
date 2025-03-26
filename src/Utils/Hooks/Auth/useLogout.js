"use client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { requestV1 } from "../../AxiosUtils"
import { logoutAPI } from "../../AxiosUtils/API";
import { ToastNotification } from "../../CustomFunctions/ToastNotification"

const useLogout = () => {
  const router = useRouter()

  return useMutation(
    () =>
      requestV1(
        {
          url: logoutAPI,
          method: "post"
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

export default useLogout