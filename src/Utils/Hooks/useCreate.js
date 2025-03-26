import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { requestV1 } from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { ToastNotification } from "../CustomFunctions/ToastNotification";
import { usersV1 } from "@/Utils/AxiosUtils/API";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";

const useCreate = (
  updateId,
  path = false,
  message,
  extraFunction,
  notHandler,
  responseType,
  errFunction
) => {
  const router = useRouter();
  const pathname = usePathname();
  const { invalidateQueriesByString } = useInvalidateQueries();
  return useMutation(
    (data) =>
      requestV1(
        {
          url: usersV1,
          data,
          method: "post",
          responseType: responseType ? responseType : "",
        },
        router,
        true
      ),
    {
      onSuccess: (resDta) => {
        if (resDta?.response?.data?.success === !true) {
          ToastNotification("error", resDta?.response?.data?.message);
        } else {
          !notHandler && SuccessHandle(resDta, router, path, message, pathname);
          extraFunction && extraFunction(resDta);
        }
        invalidateQueriesByString(usersV1);
      },
      onError: (err) => {
        errFunction && errFunction(err);
        return err;
      },
    }
  );
};

export default useCreate;
