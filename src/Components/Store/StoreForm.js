import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import FormBtn from "../../Elements/Buttons/FormBtn";
import { requestV1 } from "@/Utils/AxiosUtils";
import { storesV1 } from "@/Utils/AxiosUtils/API";
import { YupObject } from "@/Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import AddressComponent from "../InputFields/AddressComponent";
import SimpleInputField from "../InputFields/SimpleInputField";
import { StoreInitialValue } from "./Widgets/StoreInitialValue";
import { StoreValidationSchema } from "./Widgets/StoreValidationSchema";
import StoreVendor from "./Widgets/StoreVendor";

const StoreForm = ({ updateId, buttonName, mutate, isLoading }) => {
  const { t } = useTranslation(["store", "validation"]);
  const router = useRouter();
  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
  } = useQuery(["store/id"], () => requestV1({ url: `${storesV1}/${updateId}` }, router), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data?.data,
  });

  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  const handleSubmit = async (values) => {
    await mutate({
      ...values,
      phone: values.phone?.toString().trim(),
    });
  };

  if (updateId && (oldDataLoading || isLoading)) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ ...StoreInitialValue(updateId, oldData) }}
        validationSchema={YupObject().shape(StoreValidationSchema(t))}
        onSubmit={handleSubmit}
      >
        {({ values, touched }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              <SimpleInputField
                nameList={[
                  { name: "name", title: t("store:form.formName"), placeholder: t("store:form.placeholderName"), require: "true" },
                ]}
              />
              <AddressComponent values={values} />
              <StoreVendor />
              <SimpleInputField
                nameList={[
                  { name: "hours", title: t("store:form.formHours"), placeholder: t("store:form.placeholderHours") },
                ]}
              />
              <FormBtn buttonName={buttonName} />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StoreForm;
