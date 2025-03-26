"use client";

import UserForm from "@/Components/User/UserForm";
import { user } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import { useTranslation } from "react-i18next";

const AddNewUser = () => {
  const { mutate, isLoading } = useCreate(user, '/user', "Usuario creado correctamente");
  const { t } = useTranslation("common");
  return (
    <FormWrapper title="AddUser">
      <UserForm mutate={mutate} loading={isLoading} buttonName={t("Save")} />
    </FormWrapper>
  );
};

export default AddNewUser;
