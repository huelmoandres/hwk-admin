import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";

const AllFaqTable = ({ data, ...props }) => {
  const headerObj = {
    checkBox: true,
    isOption: true,
    noEdit: true,
    isSerialNo: false,
    optionHead: { title: "Action" },
    column: [
      { title: "Title", apiKey: "title", sorting: true, sortBy: "desc" },
      { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
      { title: "Status", apiKey: "status", type: "switch" },
    ],
    data: data || [],
  };
  if (!data) return null;
  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};
export default TableWarper(AllFaqTable);
