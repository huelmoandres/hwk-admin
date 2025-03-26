"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import { usersV1 } from "@/Utils/AxiosUtils/API";
import AllUsersTable from "@/Components/User/AllUsersTable";

const AllUsers = () => {
  return (
    <Col sm="12">
      <AllUsersTable
        url={usersV1}
        moduleName="User"
        exportButton={true}
        importExport={false}
      />
    </Col>
  );
};

export default AllUsers;
