import FileUploadField from "../InputFields/FileUploadField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";

import { useTranslation } from "react-i18next";

const GeneralTab = ({ values, setFieldValue, errors }) => {
  const { t } = useTranslation("settings");
  return (
    <>
      <FileUploadField
        name="logoLightPath"
        uniquename={values?.logoLightPath}
        title={t("form.formLogoLight")}
        errors={errors}
        id="logoLightPath"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        helpertext={getHelperText("180x50px")}
        multiple={false}
        showImage={true}
      />

      <FileUploadField
        name="darkLogoImage"
        title={t("form.formLogoDark")}
        uniquename={values?.darkLogoPath}
        id="darkLogoPath"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        helpertext={getHelperText("180x50px")}
        multiple={false}
        showImage={true}
      />

      <FileUploadField
        name="faviconPath"
        title={t("form.formFavicon")}
        uniquename={values?.faviconPath}
        id="faviconPath"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        helpertext={getHelperText("16x16px")}
        multiple={false}
        showImage={true}
      />

      <SimpleInputField
        nameList={[
          {
            name: "siteName",
            title: t("form.formSiteName"),
            placeholder: t("form.placeholderSiteName"),
            require: "true",
            errormsg: "siteName",
          },
          {
            name: "siteDescription",
            title: t("form.formSiteDescription"),
            placeholder: t("form.placeholderSiteDescription"),
            errormsg: "siteDescription",
            require: "true"
          },
          {
            name: "primaryColor",
            title: t("form.formPrimaryColor"),
            placeholder: t("form.placeholderPrimaryColor"),
            errormsg: "primaryColor",
            require: "true"
          },
          {
            name: "secondaryColor",
            title: t("form.formSecondaryColor"),
            placeholder: t("form.placeholderSecondaryColor"),
          },
        ]}
      />
    </>
  );
};

export default GeneralTab;
