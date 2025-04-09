import React from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import DescriptionInput from "../Widgets/DescriptionInput";
import { useTranslation } from "react-i18next";

const GeneralTab = ({ values, setFieldValue, updateId }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "mlId", placeholder: t("EnterName"), disabled: true },
          { name: "title", placeholder: t("EnterTitle"), disabled: true },
          { name: "siteId", placeholder: t("EnterSiteiD"), disabled: true },
        ]}
      />
      <DescriptionInput
        values={values}
        setFieldValue={setFieldValue}
        title={t("Description")}
        nameKey="description"
        disabled={true}
      />
    </>
  );
};

export default GeneralTab;
