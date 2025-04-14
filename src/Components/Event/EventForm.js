import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import FormBtn from "../../Elements/Buttons/FormBtn";
import { requestV1 } from "@/Utils/AxiosUtils";
import { eventsV1 } from "@/Utils/AxiosUtils/API";
import { YupObject } from "@/Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import AddressComponent from "../InputFields/AddressComponent";
import SimpleInputField from "../InputFields/SimpleInputField";
import { EventInitialValue } from "./Widgets/EventInitialValue";
import { EventValidationSchema } from "./Widgets/EventValidationSchema";
import StoreVendor from "./Widgets/StoreVendor";
import InputDate from "@/Components/InputFields/DateField";
import DescriptionInput from "@/Components/Widgets/DescriptionInput";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import { replaceEmptyStringsWithNull } from "@/Utils/CustomFunctions/convertEmptyToNull";

const EventForm = ({ updateId, buttonName, mutate, isLoading }) => {
  const { t } = useTranslation(["event", "validation"]);
  const router = useRouter();
  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
  } = useQuery(["event/slug"], () => requestV1({ url: `${eventsV1}/${updateId}` }, router), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data?.data,
  });

  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  const handleSubmit = async (values) => {
    await mutate(values);
  };

  if (updateId && (oldDataLoading || isLoading)) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ ...EventInitialValue(updateId, oldData) }}
        validationSchema={YupObject().shape(EventValidationSchema(t))}
        onSubmit={handleSubmit}
      >
        {({ values, touched, setFieldValue, errors }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              <SimpleInputField
                nameList={[
                  { name: "title", title: t("event:form.formTitle"), placeholder: t("event:form.placeholderTitle"), require: "true" },
                ]}
              />
              <DescriptionInput
                values={values}
                setFieldValue={setFieldValue}
                title={t("event:form.placeholderDescription")}
                nameKey="description"
                required={true}
              />
              <InputDate
                name={"startDate"}
                placeholder={t("event:form.placeholderStartDate")}
                maxDate={new Date()}
              />
              <InputDate
                name={"endDate"}
                placeholder={t("event:form.placeholderEndDate")}
                maxDate={new Date()}
              />
              <SimpleInputField
                nameList={[
                  { name: "location", title: t("event:form.formLocation"), placeholder: t("event:form.placeholderLocation") },
                ]}
              />
              <FileUploadField
                name="mediaIds"
                uniquename={values?.mediaIds}
                title={t("event:form.formMedias")}
                errors={errors}
                id="mediaIds"
                type="file"
                values={values}
                setFieldValue={setFieldValue}
                helpertext={getHelperText("180x50px")}
                multiple={true}
                addMoreFiles={true}
                deleteFiles={true}
              />
              <FormBtn buttonName={buttonName} />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EventForm;
