import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import Btn from "../../Elements/Buttons/Btn";
import Pluralize from "../../Utils/CustomFunctions/Pluralize";
import NoSsr from "../../Utils/HOC/NoSsr";
import ImportExport from "./ImportExport";

const TableTitle = ({
  moduleName,
  onlyTitle,
  type,
  filterHeader,
  importExport,
  refetch,
  exportButton,
  showFilterDifferentPlace,
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="title-header option-title">
      <h5>{filterHeader?.customTitle ? t(filterHeader?.customTitle) : t(Pluralize(moduleName))}</h5>
      {importExport && (
        <ImportExport
          importExport={importExport}
          moduleName={Pluralize(moduleName)}
          refetch={refetch}
          exportButton={exportButton}
        />
      )}
      <NoSsr>
        {filterHeader?.customFilter && !showFilterDifferentPlace && filterHeader?.customFilter}
        {!onlyTitle && (
          <Btn
            className="align-items-center btn-theme add-button"
            title={t("Add") + " " + t(moduleName)}
            onClick={() =>
              type == "post" && moduleName.toLowerCase() == "tag"
                ? router.push(`/${pathname.split("/")[1]}/tag/create`)
                : type == "post"
                  ? router.push(`/${pathname.split("/")[1]}/category/create`)
                  : router.push(`/${pathname.split("/")[1]}/create`)
            }
          >
            <FiPlus />
          </Btn>
        )}
      </NoSsr>
    </div>
  );
};

export default TableTitle;
