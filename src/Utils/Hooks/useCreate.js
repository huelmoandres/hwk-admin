import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { requestV1 } from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { ToastNotification } from "../CustomFunctions/ToastNotification";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";

const useCreate = (
  url,
  path = false,
  message,
  invalidateQueriesPath,
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
          url,
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
        if (invalidateQueriesPath) {
          invalidateQueriesByString(invalidateQueriesPath);
        }
      },
      onError: (err) => {
        errFunction && errFunction(err);
        return err;
      },
    }
  );
};

export default useCreate;
