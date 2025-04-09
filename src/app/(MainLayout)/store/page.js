"use client";
import { Col } from "reactstrap";
import AllStoresTable from "@/Components/Store/AllStoresTable";
import { storesV1 } from "@/Utils/AxiosUtils/API";

const AllStores = () => {
  return (
    <Col sm="12">
      <AllStoresTable url={storesV1} moduleName="Store" />
    </Col>
  );
};

export default AllStores;
