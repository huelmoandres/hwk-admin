import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import FormBtn from "../../Elements/Buttons/FormBtn";
import { requestV1 } from "@/Utils/AxiosUtils";
import {
  emailSchema,
  nameSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
  YupObject,
} from "@/Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CreateUser from "./Widgets/CreateUser";
import { useRouter } from "next/navigation";
import { countryV1, usersV1 } from "@/Utils/AxiosUtils/API";

const UserForm = ({
  mutate,
  loading,
  updateId,
  buttonName,
}) => {
  const router = useRouter();
  const {
    data: countries,
    isLoading: countriesLoading
  } = useQuery([countryV1], () => requestV1({ url: `${countryV1}` }, router));
  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
  } = useQuery(["users", updateId], () => requestV1({ url: `${usersV1}/${updateId}` }, router), {
    enabled: false
  });

  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);

  const handleSubmit = async (values) => {
    const { email, password_confirmation, password, ...restData } = values;
    const newData = {
      ...restData,
      ...(password && password.trim().length > 1 ? { password } : {}),
      phoneNumber: values.phoneNumber?.toString()
    };
    await mutate(newData);
  };

  if (updateId && (oldDataLoading || countriesLoading)) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        lastName: updateId ? oldData?.data?.lastName || "" : "",
        email: updateId ? oldData?.data?.email || "" : "",
        phoneNumber: updateId ? Number(oldData?.data?.phoneNumber) || "" : "",
        password: "",
        password_confirmation: "",
        role: updateId ? oldData?.data?.role || "" : "admin",
        isActive: updateId ? Boolean(oldData?.data?.isActive) : true,
        phoneCode: updateId ? oldData?.data?.phoneCode || 598 : 598,
        birthDate: updateId ? oldData?.data?.birthDate || null : null,
        country: updateId ? oldData?.data?.country?.id || 858 : 858,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        lastName: nameSchema,
        email: emailSchema,
        phoneNumber: phoneSchema,
        phoneCode: nameSchema,
        password: !updateId && passwordSchema,
        password_confirmation: !updateId && passwordConfirmationSchema,
        role: nameSchema,
        country: nameSchema,
      })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <CreateUser updateId={updateId} countries={countries?.data} />
            <FormBtn loading={loading} buttonName={buttonName} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
