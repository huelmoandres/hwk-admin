import { useQuery } from "@tanstack/react-query";
import SearchableSelectInput from "./SearchableSelectInput";
import SimpleInputField from "./SimpleInputField";
import Loader from "../CommonComponent/Loader";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { stateV1 } from "@/Utils/AxiosUtils/API";
import { requestV1 } from "@/Utils/AxiosUtils";

const AddressComponent = ({ values }) => {
  const router = useRouter();
  const { t } = useTranslation("store");
  const { data, isLoading } = useQuery([stateV1], () => requestV1({ url: `${stateV1}/country/858` }, router), {
    refetchOnWindowFocus: false,
    select: (res) =>
      res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })),
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: "stateId",
            require: "true",
            title: t("form.formState"),
            inputprops: {
              name: "stateId",
              id: "stateId",
              options: data,
              defaultOption: t("form.placeholderState"),
              close: values["id"] !== "",
            },
          },
        ]}
      />
      <SimpleInputField
        nameList={[
          { name: "address", title: t("form.formAddress"), placeholder: t("form.placeholderAddress"), type: "textarea", require: "true" },
        ]}
      />
    </>
  );
};

export default AddressComponent;
