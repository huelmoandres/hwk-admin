"use client";
import UserForm from "@/Components/User/UserForm";
import { usersV1 } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";
import { useTranslation } from "react-i18next";

const AddNewUser = () => {
  const { mutate, isLoading } = useCreate(usersV1, '/user', "Usuario creado correctamente", usersV1);
  const { t } = useTranslation("common");
  return (
    <FormWrapper title="AddUser">
      <UserForm mutate={mutate} loading={isLoading} buttonName={t("Save")} />
    </FormWrapper>
  );
};

export default AddNewUser;
