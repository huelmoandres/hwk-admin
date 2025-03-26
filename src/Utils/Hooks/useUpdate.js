import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { requestV1 } from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { usersV1 } from "@/Utils/AxiosUtils/API";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";

const useUpdate = (updateId, path, message, extraFunction) => {
  const router = useRouter();
  const pathname = usePathname();
  const { invalidateQueriesByString } = useInvalidateQueries();
  return useMutation(
    (data) => {
      const { email, password_confirmation, password, ...restData } = data;
      const newData = {
        ...restData,
        ...(password && password.trim().length > 1 ? { password } : {})
      };
      return requestV1(
        {
          url: `${usersV1}/${Array.isArray(updateId) ? updateId.join("/") : updateId}`,
          method: "patch",
          data: newData
        },
        router,
        true
      );
    },
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, router, path, message, pathname);
        extraFunction && extraFunction(resData);
        invalidateQueriesByString(usersV1);
      },
    }
  );
};
export default useUpdate;
