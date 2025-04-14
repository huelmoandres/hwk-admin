import { useTranslation } from "react-i18next";
import { AllCountryCode } from "@/Data/AllCountryCode";
import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import SimpleInputField from "../../InputFields/SimpleInputField";

const StoreVendor = () => {
  const { t } = useTranslation("store");
  return (
    <>
      <div className="country-input mb-4">
        <SimpleInputField
          nameList={[
            {
              name: "phone",
              title: t("form.formPhone"),
              placeholder: t("form.placeholderPhone"),
              type: "number",
            },
          ]}
        />

        <SearchableSelectInput
          nameList={[
            {
              name: "phoneCode",
              notitle: "true",
              inputprops: {
                name: "phoneCode",
                id: "phoneCode",
                options: [
                  { id: null, name: t("form.placeholderPhoneCode") },
                  { id: 598, name: "+598", data: { class: "uy", code: "+598" } }
                ],
              },
            },
          ]}
        />
      </div>
    </>
  );
};

export default StoreVendor;
