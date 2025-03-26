import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";

const AllBlogsTable = ({ data, ...props }) => {
  const headerObj = {
    checkBox: true,
    isSerialNo: false,
    isOption: true,
    noEdit: true,
    optionHead: { title: "Action", show: "blog" },
    column: [
      { title: "Image", apiKey: "blog_thumbnail", sorting: true, sortBy: "desc", type: "image" },
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

export default TableWarper(AllBlogsTable);
