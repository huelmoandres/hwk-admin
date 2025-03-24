import request from "@/Utils/AxiosUtils";
import { NoticeRecent } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import NoticeDashBoard from "./NoticeDashBoard";
import TopDashSection from "./TopDashSection";
import { useRouter } from "next/navigation";

const MainDashboard = () => {
  const router = useRouter();

  const { data, refetch } = useQuery(
    [NoticeRecent],
    () => (!isAdmin ? request({ url: NoticeRecent }, router) : Promise.resolve()),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      select: (data) => data?.data,
    }
  );
  
  return (
    <>
      {data?.is_read === 0 && <NoticeDashBoard data={data} refetch={refetch} />}
      <TopDashSection />
    </>
  );
};

export default MainDashboard;
