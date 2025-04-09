"use client";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import { useTranslation } from "react-i18next";
import {
  nameSchema,
  YupObject,
} from "@/Utils/Validation/ValidationSchemas";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import FormBtn from "@/Elements/Buttons/FormBtn";
import React from "react";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import useProductAdd from "@/Utils/Hooks/ml/useProductAdd";

const AddNewUser = () => {
  const { mutate, isLoading } = useProductAdd();
  const { t } = useTranslation("common");

  return (
    <FormWrapper title="AddProduct">
      <Formik
        enableReinitialize
        initialValues={{
          mlId: "",
        }}
        validationSchema={YupObject({
          mlId: nameSchema,
        })}
        onSubmit={(values) => mutate(values.mlId)}
      >
        {({ values }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              <SimpleInputField
                nameList={[
                  { name: "mlId", placeholder: t("EnterMLID"), require: "true" },
                ]}
              />
              <FormBtn loading={isLoading} buttonName={"AddProduct"} />
            </Row>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default AddNewUser;