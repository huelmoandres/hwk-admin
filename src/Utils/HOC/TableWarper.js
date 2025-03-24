import React, { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "reactstrap";
import Loader from "../../Components/CommonComponent/Loader";
import TableBottom from "../../Components/Table/TableBottom";
import TableTitle from "../../Components/Table/TableTitle";
import TableTop from "../../Components/Table/TableTop";
import useAllUsers from "../Hooks/Users/useAllUsers";

const TableWarper = (WrappedComponent) => {
  const HocComponent = forwardRef(
    (
      {
        url,
        loading,
        moduleName,
        setFieldValue,
        userIdParams,
        type,
        paramsProps,
        onlyTitle,
        isCheck,
        setIsCheck,
        isReplicate,
        dateRange,
        filterHeader,
        importExport,
        keyInPermission,
        ...props
      },
      ref
    ) => {
      const [paginate, setPaginate] = useState(15);
      const [page, setPage] = useState(1);
      const [search, setSearch] = useState("");
      const [date, setDate] = useState([{ startDate: null, endDate: null, key: "selection" }]);
      const [sortBy, setSortBy] = useState({ field: "", sort: "asc" });
      const { data, isLoading: isLoadingUsers, fetchStatus } = useAllUsers({
        paginate,
        page,
        search,
        sort: sortBy?.sort,
        field: sortBy?.field,
        type: type,
        start_date: date[0]?.startDate ?? null,
        end_date: date[0]?.endDate ?? null,
        ...paramsProps,
      });

      if (isLoadingUsers) return <Loader />;
      return (
        <>
          <Card>
            <CardBody className="custom-role">
              <TableTitle
                moduleName={moduleName}
                type={type}
                onlyTitle={onlyTitle}
                filterHeader={filterHeader}
                importExport={importExport}
              />
              {(filterHeader?.noPageDrop !== true || filterHeader?.noSearch !== true) && (
                <TableTop
                  setPaginate={setPaginate}
                  setSearch={setSearch}
                  paginate={paginate}
                  isCheck={isCheck}
                  setIsCheck={setIsCheck}
                  url={url}
                  isReplicate={isReplicate}
                  dateRange={dateRange}
                  date={date}
                  setDate={setDate}
                  filterHeader={filterHeader}
                  keyInPermission={keyInPermission}
                />
              )}
              <div className="table-responsive border-table">
                <WrappedComponent
                  data={data ?? []}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  moduleName={moduleName}
                  type={type}
                  current_page={1}
                  per_page={100}
                  userIdParams={userIdParams}
                  fetchStatus={fetchStatus}
                  isCheck={isCheck}
                  setIsCheck={setIsCheck}
                  {...props}
                  keyInPermission={keyInPermission}
                />
              </div>
            </CardBody>
            {filterHeader?.noPagination !== true && (
              <TableBottom
                current_page={
                  userIdParams ? data?.data?.transactions?.current_page : data?.data?.current_page
                }
                total={userIdParams ? data?.data?.transactions?.total : data?.data?.total}
                per_page={userIdParams ? data?.data?.transactions?.per_page : data?.data?.per_page}
                setPage={setPage}
              />
            )}
          </Card>
        </>
      );
    }
  );
  return HocComponent;
};

export default TableWarper;
