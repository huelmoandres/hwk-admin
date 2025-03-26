import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "../CommonComponent/Loader";

const AllUsersTable = ({ data, ...props }) => {
  const headerObj = {
    checkBox: false,
    isOption: true,
    noEdit: false,
    isSerialNo: false,
    optionHead: { title: "Action" },
    column: [
      {
        title: "Avatar",
        apiKey: "profile_image",
        type: "image",
        class: "sm-width",
        NameWithRound: true,
      },
      { title: "Name", apiKey: "name", sorting: true, sortBy: "desc" },
      { title: "LastName", apiKey: "lastName", sorting: true, sortBy: "desc" },
      { title: "Email", apiKey: "email", sorting: true, sortBy: "desc" },
      { title: "Role", apiKey: "role", sorting: false, sortBy: "desc" },
      { title: "CreateAt", apiKey: "createdAt", sorting: true, sortBy: "desc", type: "date" },
      { title: "Status", apiKey: "isActive", type: "switch" },
    ],
    data: data || [],
  };
  if (!data) return <Loader />;
  return (
    <>
      <ShowTable {...props} headerData={headerObj} />
    </>
  );
};

export default TableWarper(AllUsersTable);
