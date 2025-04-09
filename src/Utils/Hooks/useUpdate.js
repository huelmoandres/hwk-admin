import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { requestV1 } from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";

const useUpdate = (url, path, message, extraFunction, invalidateQueriesKey) => {
  const router = useRouter();
  const pathname = usePathname();
  const { invalidateQueriesByString } = useInvalidateQueries();
  return useMutation(
    (data) => {
      return requestV1(
        {
          url,
          method: "patch",
          data
        },
        router,
        true
      );
    },
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, router, path, message, pathname);
        extraFunction && extraFunction(resData);
        if (invalidateQueriesKey) {
          invalidateQueriesByString(invalidateQueriesKey);
        }
      },
    }
  );
};
export default useUpdate;

