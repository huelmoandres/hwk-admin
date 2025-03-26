import React, { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "reactstrap";
import Loader from "../../Components/CommonComponent/Loader";
import TableBottom from "../../Components/Table/TableBottom";
import TableTitle from "../../Components/Table/TableTitle";
import TableTop from "../../Components/Table/TableTop";
import { requestV1 } from "../AxiosUtils";

const TableWarper = (WrappedComponent) => {
  const HocComponent = forwardRef(({ url, loading, moduleName, setFieldValue, userIdParams, type, paramsProps, onlyTitle, isCheck, setIsCheck, isReplicate, dateRange, filterHeader, importExport, keyInPermission, ...props }, ref) => {
    const router = useRouter();
    const [paginate, setPaginate] = useState(15);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState([{ startDate: null, endDate: null, key: "selection" }]);
    const [sortBy, setSortBy] = useState({ field: "", sort: "asc" });
    let ifParamsData = paramsProps ? Object.keys(paramsProps)[0] : "";
    const { data, isLoading, refetch, fetchStatus } = useQuery(
      [url, { paginate, page, sort: sortBy?.sort, field: sortBy?.field, type: type, start_date: date[0]?.startDate ?? null, end_date: date[0]?.endDate ?? null, ...paramsProps }],
      () =>
        requestV1(
          {
            url,
            method: "get",
            params: { paginate, page, sort: sortBy?.sort, field: sortBy?.field, type: type, start_date: date[0]?.startDate ?? null, end_date: date[0]?.endDate ?? null, ...paramsProps },
          },
          router
        )
    );

    console.log("data", data);

    // To use this function in parent
    useImperativeHandle(ref, () => ({
      call() {
        refetch();
      },
    }));

    useEffect(() => {
      if (!data?.data?.length || !data?.data?.length) {
        setIsCheck && setIsCheck([]);
      }
      if (setFieldValue) {
        setFieldValue ? setFieldValue("showBalance", data?.data?.balance) : "";
      }
    }, [data]);

    if (isLoading) return <Loader />;
    return (
      <>
        <Card>
          <CardBody className="custom-role">
            <TableTitle moduleName={moduleName} type={type} onlyTitle={onlyTitle} filterHeader={filterHeader} importExport={importExport} refetch={refetch} />
            {(filterHeader?.noPageDrop !== true || filterHeader?.noSearch !== true) && <TableTop setPaginate={setPaginate} setSearch={setSearch} paginate={paginate} isCheck={isCheck} setIsCheck={setIsCheck} url={url} isReplicate={isReplicate} refetch={refetch} dateRange={dateRange} date={date} setDate={setDate} filterHeader={filterHeader} keyInPermission={keyInPermission} />}
            <div className="table-responsive border-table">
              <WrappedComponent data={userIdParams ? data?.data : data?.data} sortBy={sortBy} setSortBy={setSortBy} moduleName={moduleName} type={type} current_page={userIdParams ? data?.data?.transactions?.current_page : data?.meta?.page} per_page={userIdParams ? data?.data?.transactions?.per_page : data?.meta?.perPage} url={url} userIdParams={userIdParams} fetchStatus={fetchStatus} refetch={refetch} isCheck={isCheck} setIsCheck={setIsCheck} {...props} keyInPermission={keyInPermission} />
            </div>
          </CardBody>
          {filterHeader?.noPagination !== true && <TableBottom current_page={userIdParams ? data?.data?.transactions?.current_page : data?.meta?.page} total={userIdParams ? data?.data?.transactions?.total : data?.meta?.total} per_page={userIdParams ? data?.data?.transactions?.per_page : data?.meta?.perPage} setPage={setPage} />}
        </Card>
      </>
    );
  });
  return HocComponent;
};

export default TableWarper;
