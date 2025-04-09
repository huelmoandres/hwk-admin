"use client";
import StoreForm from "@/Components/Store/StoreForm";
import { storesV1 } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useTranslation } from "react-i18next";

const StoreUpdate = ({ params }) => {
  const { t } = useTranslation("store");
  const { mutate, isLoading } = useUpdate(
    params.updateId ? `${storesV1}/${Array.isArray(params.updateId) ? params.updateId.join("/") : params.updateId}` : "",
    "/store",
    t("storeUpdated"),
    null,
    storesV1
  );

  return (
    params?.updateId && (
      <FormWrapper title="EditStore">
        <StoreForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          buttonName={t("updateButton")}
        />
      </FormWrapper>
    )
  );
};

export default StoreUpdate;
