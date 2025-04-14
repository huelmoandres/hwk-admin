import FileUploadField from "../InputFields/FileUploadField";
import SimpleInputField from "../InputFields/SimpleInputField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import { useTranslation } from "react-i18next";

const GeneralBanners = ({ values, setFieldValue, errors }) => {
  const { t } = useTranslation("settings");
  return (
    <>
      <FileUploadField
        name="generalBannerUrls"
        uniquename={values?.generalBannerUrls}
        title={t("form.generalBanners")}
        errors={errors}
        id="generalBannerUrls"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        helpertext={getHelperText("180x50px")}
        multiple={true}
        addMoreFiles={true}
        deleteFiles={true}
      />
    </>
  );
};

export default GeneralBanners;
