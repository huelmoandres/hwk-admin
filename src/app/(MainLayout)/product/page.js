"use client";
import { useQuery } from "@tanstack/react-query";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import AllProductTable from "@/Components/Product/AllProductTable";
import {
  BrandAPI,
  Category,
  product, productDb,
  store,
} from "@/Utils/AxiosUtils/API";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { requestV1 } from "@/Utils/AxiosUtils";
import MultiSelectField from "@/Components/InputFields/MultiSelectField";

import { useRouter } from "next/navigation";

const AllProducts = () => {
  const router = useRouter();
  return (
    <Col sm="12">
      <AllProductTable
        url={`${productDb}/all`}
        moduleName="Product"
      />
    </Col>
  );
};

export default AllProducts;
