"use client";
import { Col } from "reactstrap";
import { eventsV1 } from "@/Utils/AxiosUtils/API";
import AllEventsTable from "@/Components/Event/AllEventsTable";

const AllEvents = () => {
  return (
    <Col sm="12">
      <AllEventsTable url={eventsV1} moduleName="Event" />
    </Col>
  );
};

export default AllEvents;
