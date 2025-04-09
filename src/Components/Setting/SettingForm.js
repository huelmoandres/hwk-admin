import TabTitle from "@/Components/Widgets/TabTitle";
import { dateSubmitValue } from "@/Utils/CustomFunctions/DateFormate";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "reactstrap";
import { SettingTabTitleListData } from "../../Data/TabTitleListData";
import Btn from "../../Elements/Buttons/Btn";
import request, { requestV1 } from "../../Utils/AxiosUtils";
import { settingsV1 } from "../../Utils/AxiosUtils/API";
import { YupObject, emailSchema, nameSchema } from "../../Utils/Validation/ValidationSchemas";
import AllTabs from "./AllTabs";

const SettingForm = ({ mutate, loading, title }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");
  const { data, isLoading, refetch } = useQuery(
    [settingsV1],
    () => requestV1({ url: settingsV1 }, router),
    { enabled: false, refetchOnWindowFocus: false, select: (res) => res.data }
  );

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading && !data) return null;

  const validationSchema = YupObject({});

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        siteName: data?.siteName ?? "",
        siteDescription: data?.siteDescription ?? "",
        logoLightPath: data?.logoLightPath ?? "",
        logoDarkPath: data?.logoDarkPath ?? "",
        faviconPath: data?.faviconPath ?? "",
        primaryColor: data?.primaryColor ?? "",
        secondaryColor: data?.secondaryColor ?? "",
        contactEmail: data?.contactEmail ?? "",
        contactPhone: data?.contactPhone ?? "",
        contactAddress: data?.contactAddress ?? "",
        facebookUrl: data?.facebookUrl ?? "",
        instagramUrl: data?.instagramUrl ?? "",
        twitterUrl: data?.twitterUrl ?? "",
        youtubeUrl: data?.youtubeUrl ?? "",
        defaultMetaTitle: data?.defaultMetaTitle ?? "",
        defaultMetaDescription: data?.defaultMetaDescription ?? "",
        accessoriesCategoryIds: data?.accessoriesCategories?.map((category) => category.id) ?? [],
        glassesCategoryIds: data?.glassesCategories?.map((category) => category.id) ?? [],
      }}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Col>
          <Card>
            <div className="title-header option-title">
              <h5>{t(title)}</h5>
            </div>
            <Form className="theme-form theme-form-2 mega-form vertical-tabs">
              <Row>
                <Col xl="3" lg="4">
                  <TabTitle
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    titleList={SettingTabTitleListData(t)}
                    errors={errors}
                    touched={touched}
                  />
                </Col>
                <AllTabs
                  values={values}
                  activeTab={activeTab}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />
                <div className="ms-auto justify-content-end dflex-wgap mt-4 save-back-button">
                  {/* <Btn className="me-2 btn-outline btn-lg" title="Back" onClick={() => router.back()} /> */}
                  <Btn
                    className="btn-primary btn-lg"
                    type="submit"
                    title="Save"
                    loading={Number(loading)}
                  />
                </div>
              </Row>
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default SettingForm;
