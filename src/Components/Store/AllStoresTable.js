import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "@/Components/CommonComponent/Loader";
import useDelete from "@/Utils/Hooks/useDelete";
import { storesV1 } from "@/Utils/AxiosUtils/API";

const AllRoles = ({ data, ...props }) => {
  const { mutate: deleteMutate, isLoading } = useDelete(
    storesV1,
    storesV1
  );

  const headerObj = {
    checkBox: false,
    isOption: true,
    noEdit: false,
    optionHead: { title: "Action", show: "seller/store" },
    column: [
      { title: "StoreName", apiKey: "name" },
      { title: "Address", apiKey: "address" },
      { title: "Phone", apiKey: "phone" },
      { title: "Hours", apiKey: "hours" },
      { title: "Departament", apiKey: "state", subKey: ["name"] },
    ],
    data: data || [],
  };
  if (!data || isLoading) return <Loader />;
  return (
    <>
      <ShowTable {...props} headerData={headerObj} mutate={deleteMutate} />
    </>
  );
};

export default TableWarper(AllRoles);
