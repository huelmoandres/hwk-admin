import { useEffect } from "react";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import WholesaleTab from "./Widgets/Wholesale/WholesaleTab";
import { useTranslation } from "react-i18next";

const InventoryTab = ({
  values
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <SimpleInputField
        nameList={[
          {
            name: "permalink",
            title: "External Url",
            placeholder: t("Enter External Url"),
          },
          {
            name: "price",
            title: "Price",
            placeholder: t("Enter External Url"),
          },
          {
            name: "basePrice",
            title: "Base Price",
            placeholder: t("Enter External Url"),
          },
          {
            name: "originalPrice",
            title: "Original Price",
            placeholder: t("Enter External Url"),
          }
        ]}
      />
    </>
  );
};
export default InventoryTab;
