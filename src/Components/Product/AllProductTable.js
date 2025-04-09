import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "../CommonComponent/Loader";
import { useTranslation } from "react-i18next";
import { placeHolderImage } from "@/Data/CommonPath";

const AllProductTable = ({ data, ...props }) => {
  const { t } = useTranslation("common");

  const headerObj = {
    checkBox: false,
    isOption: true,
    search: false,
    noEdit: true,
    isSerialNo: false,
    optionHead: { title: "View", show: "product", type: "View", redirectUrl: "/product" },
    column: [
      {
        title: "Image",
        apiKey: "thumbnail",
        type: "image",
        placeHolderImage: placeHolderImage,
      },
      { title: "Name", apiKey: "title", sorting: true, sortBy: "desc" }
    ],
    data: data || [],
  };

  headerObj.data.map((element) => (element.sale_price = element?.sale_price));

  if (!data) return <Loader />;

  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};

export default TableWarper(AllProductTable);
