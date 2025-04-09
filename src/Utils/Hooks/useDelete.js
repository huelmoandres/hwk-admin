import { useMutation } from "@tanstack/react-query";
import { requestV1 } from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";

const useDelete = (url, refetch, extraFunction) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { invalidateQueriesByString } = useInvalidateQueries();

  return useMutation(
    (deleteId) => requestV1({ url: `${url}/${deleteId}`, method: "delete" }, router, true),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, false, false, t("DeletedSuccessfully"));
        refetch && invalidateQueriesByString(refetch);
        extraFunction && extraFunction(resData);
      },
    }
  );
};

export default useDelete;
