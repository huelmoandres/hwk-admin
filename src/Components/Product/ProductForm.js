import TabForProduct from "@/Components/Product/Widgets/TabForProduct";
import Btn from "@/Elements/Buttons/Btn";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import { requestV1 } from "@/Utils/AxiosUtils";
import { productDb } from "@/Utils/AxiosUtils/API";
import { YupObject } from "@/Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import AllProductTabs from "../Product/Widgets/AllProductTabs";
import { ProductInitValues, ProductValidationSchema } from "./Widgets/ProductObjects";

const ProductForm = ({ updateId, title, buttonName, saveButton, setSaveButton }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("1");
  const { state } = useContext(SettingContext);
  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
  } = useQuery([updateId], () => requestV1({ url: `${productDb}/${updateId}` }, router), {
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (updateId) {
      !saveButton && refetch();
    }
  }, [updateId]);

  const watchEvent = useCallback(
    (oldData, updateId) => {
      return ProductInitValues(oldData, updateId);
    },
    [oldData, updateId]
  );

  if (updateId && oldDataLoading) return <Loader />;
  return (
    <Formik
      initialValues={{ ...watchEvent(oldData, updateId) }}
      validationSchema={YupObject({
        ...ProductValidationSchema,
      })}
     onSubmit={() => undefined}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting, setErrors, setTouched }) => (
        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
          <Row>
            <Col>
              <Card>
                <div className="title-header option-title">
                  <h5>{t(title)}</h5>
                </div>
                <Row>
                  <Col xl="3" lg="4">
                    <TabForProduct
                      values={values}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      errors={errors}
                      touched={touched}
                    />
                  </Col>
                  <AllProductTabs
                    setErrors={setErrors}
                    setTouched={setTouched}
                    touched={touched}
                    values={values}
                    activeTab={activeTab}
                    isSubmitting={isSubmitting}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    updateId={updateId}
                    setActiveTab={setActiveTab}
                  />
                  <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
                    <Btn className="btn-outline" title="Back" onClick={() => router.back()} />
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
