import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { productDb } from "@/Utils/AxiosUtils/API";
import { useInvalidateQueries } from "@/Utils/Hooks/useInvalidateQueries";
import SuccessHandle from "@/Utils/CustomFunctions/SuccessHandle";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { requestV1 } from "@/Utils/AxiosUtils";

const useProductAdd = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { invalidateQueriesByString } = useInvalidateQueries();
  return useMutation(
    (productMlId) =>
      requestV1(
        {
          url: `${productDb}/${productMlId}`,
          method: "post"
        },
        router,
        true
      ),
    {
      onSuccess: (resDta) => {
        SuccessHandle(resDta, router, "/product", "Producto ingresado correctamente", pathname);
        invalidateQueriesByString(productDb);
      },
      onError: (err) => {
        ToastNotification("error", err?.response?.data?.message);
      },
    }
  );
};

export default useProductAdd;
