"use client";
import UserForm from "@/Components/User/UserForm";
import { usersV1 } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";

const UserUpdate = ({ params }) => {
  const { mutate, isLoading } = useUpdate(
    params.updateId ? `${usersV1}/${Array.isArray(params.updateId) ? params.updateId.join("/") : params.updateId}` : "",
    "/user",
    "Usuario actualizado correctamente",
    null,
    usersV1
  );

  return (
    params?.updateId && (
      <FormWrapper title="EditUser">
        <UserForm
          mutate={mutate}
          updateId={params.updateId}
          loading={isLoading}
          buttonName="Update"
        />
      </FormWrapper>
    )
  );
};

export default UserUpdate;
