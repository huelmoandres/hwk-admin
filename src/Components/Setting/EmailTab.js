import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";

const EmailTab = ({ values, setFieldValue, errors, touched }) => {
  const { t } = useTranslation("settings");
  return (
      <>
        <SimpleInputField
          nameList={[
            {
              name: "contactEmail",
              title: t("form.formContactEmail"),
              placeholder: t("form.placeholderContactEmail"),
              required: true,
            },
            {
              name: "contactPhone",
              title: t("form.formContactPhone"),
              placeholder: t("form.placeholderContactPhone"),
            },
            {
              name: "contactAddress",
              title: t("form.formContactAddress"),
              placeholder: t("form.placeholderContactAddress"),
            },
          ]}
        />
      </>
  );
};

export default EmailTab;
