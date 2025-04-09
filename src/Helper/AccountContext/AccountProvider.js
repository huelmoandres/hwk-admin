import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import AccountContext from ".";
import request, { requestV1 } from "../../Utils/AxiosUtils";
import { selfData, usersV1 } from "../../Utils/AxiosUtils/API";
import { off } from "next/dist/client/components/react-dev-overlay/pages/bus";

const AccountProvider = (props) => {
  const [cookies] = useCookies(["access_token", "refresh_token"]);
  const { data, isLoading } = useQuery(['usersMe'], () => requestV1({ url: `${usersV1}/me` }), {
    refetchOnWindowFocus: false,
    select: (res) => {
      return res?.data;
    },
  });
  const [accountData, setAccountData] = useState();
  const [accountContextData, setAccountContextData] = useState({
    name: "",
    image: {},
  });

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [isLoading, data, cookies.access_token, cookies.refresh_token]);

  return (
    <AccountContext.Provider
      value={{
        ...props,
        accountData,
        setAccountData,
        accountContextData,
        setAccountContextData
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
export default AccountProvider;
