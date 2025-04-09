import { useTranslation } from "react-i18next";
import MultiSelectField from "@/Components/InputFields/MultiSelectField";
import { useQuery } from "@tanstack/react-query";
import { categoriesV1 } from "@/Utils/AxiosUtils/API";
import { requestV1 } from "@/Utils/AxiosUtils";
import { useRouter } from "next/navigation";
import Loader from "@/Components/CommonComponent/Loader";
import { Col, Label } from "reactstrap";
import NameConversion from "@/Utils/CustomFunctions/NameConversion";

const CategoriesTab = ({ values, setFieldValue }) => {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [categoriesV1],
    () => requestV1({ url: categoriesV1 }, router),
    { select: (res) => res.data }
  );

  if (isLoading) return <Loader />

  return (
      <>
        {data && !isLoading && (
          <>
            <Label className="col-form-label form-label-title">
              {t("form.formAccessoriesCategoryIds")}
            </Label>
            <MultiSelectField
              notitle={"true"}
              values={values}
              name="accessoriesCategoryIds"
              data={data?.map((category) => ({
                name: category.name,
                id: category.id
              })) ?? []}
              setFieldValue={setFieldValue}
              disabled={isLoading}
            />
            <hr />
            <Label className="col-form-label form-label-title">
              {t("form.formGlassesCategoryIds")}
            </Label>
            <MultiSelectField
              notitle={"true"}
              values={values}
              name="glassesCategoryIds"
              data={data?.map((category) => ({
                name: category.name,
                id: category.id
              })) ?? []}
              setFieldValue={setFieldValue}
              disabled={isLoading}
            />
          </>
        )}
      </>
  );
};

export default CategoriesTab;
