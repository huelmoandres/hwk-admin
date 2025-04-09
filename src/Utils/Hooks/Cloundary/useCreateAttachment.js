import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";
import { requestV1 } from "@/Utils/AxiosUtils";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import SuccessHandle from "@/Utils/CustomFunctions/SuccessHandle";

const useCreateAttachment = (
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

export default useCreateAttachment;
