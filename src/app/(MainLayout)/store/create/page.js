"use client";
import StoreForm from "@/Components/Store/StoreForm";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import { useTranslation } from "react-i18next";
import useCreate from "@/Utils/Hooks/useCreate";
import { storesV1 } from "@/Utils/AxiosUtils/API";

const StoreCreate = () => {
  const { t } = useTranslation("store");
  const { mutate, isLoading } = useCreate(storesV1, '/store', t("storeSaved"), storesV1);
  return (
    <FormWrapper title="AddStore">
      <StoreForm buttonName={t("saveButton")} mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default StoreCreate;
