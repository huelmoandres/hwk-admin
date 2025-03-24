import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { requestV1 } from "../../AxiosUtils";
import { useRouter } from "next/navigation";
import { DateRange, SortBy } from "@/types/table.types";
import { User } from "@/types/user.types";

interface AllUsersParams {
  paginate?: boolean;
  page?: number;
  search?: string;
  sortBy?: SortBy;
  type?: string;
  date?: Array<DateRange>;
  paramsProps?: Record<string, any>;
}

export const allUsersQueryKey = (params: AllUsersParams): string[] => {
  return [
    "usersFindAll",
    String(params.paginate),
    String(params.page),
    params.search || "",
    params.sortBy ? `${params.sortBy.sort}-${params.sortBy.field}` : "",
    params.type || "",
    params.date ? JSON.stringify(params.date) : "",
    params.paramsProps ? JSON.stringify(params.paramsProps) : "",
  ];
};

const useAllUsers = (params: AllUsersParams): UseQueryResult<User[], Error> => {
  const router = useRouter();
  const {
    paginate,
    page,
    search,
    sortBy,
    type,
    date = [],
    paramsProps = {},
  } = params;
  
  return useQuery<User[], Error>({
    queryKey: allUsersQueryKey(params),
    queryFn: async (): Promise<User[]> => {
      const response = await requestV1({
        url: "users",
        method: "get",
        params: {
          paginate,
          page,
          search,
          sort: sortBy?.sort,
          field: sortBy?.field,
          type: type,
          start_date: date[0]?.startDate ?? null,
          end_date: date[0]?.endDate ?? null,
          ...paramsProps,
        },
      }, router);
      
      console.log("aca", response.data);

      return response.data as User[];
    },
  });
};

export default useAllUsers;