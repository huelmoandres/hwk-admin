import TableWarper from "../../Utils/HOC/TableWarper";
import ShowTable from "../Table/ShowTable";
import Loader from "@/Components/CommonComponent/Loader";
import useDelete from "@/Utils/Hooks/useDelete";
import { eventsV1 } from "@/Utils/AxiosUtils/API";

const AllEventsTable = ({ data, ...props }) => {
  const { mutate: deleteMutate, isLoading } = useDelete(
    eventsV1,
    eventsV1
  );

  const headerObj = {
    checkBox: false,
    isOption: true,
    noEdit: false,
    noDelay: false,
    optionHead: { title: "Action" },
    column: [
      { title: "Title", apiKey: "title" },
      { title: "Location", apiKey: "location", sorting: true },
      { title: "StartDate", apiKey: "startDate", sorting: true, type: "date" },
      { title: "EndDate", apiKey: "endDate", sorting: true, type: "date" },
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

export default TableWarper(AllEventsTable);
