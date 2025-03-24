import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { requestV1 } from "../../AxiosUtils";
import { useRouter } from "next/navigation";
import { statisticsV1, usersV1 } from "@/Utils/AxiosUtils/API";
import { StatisticsResponse } from "@/types/statistics.types";

export const statisticsQueryKey = (): string[] => {
  return [
    "statisticsQueryKey",
  ];
};

const useStatistics = (): UseQueryResult<StatisticsResponse, Error> => {
  const router = useRouter();

  return useQuery<StatisticsResponse, Error>({
    queryKey: statisticsQueryKey(),
    queryFn: async (): Promise<StatisticsResponse> => {
      const response = await requestV1({
        url: statisticsV1,
        method: "get"
      }, router);
      
      return response.data as StatisticsResponse;
    },
  });
};

export default useStatistics;