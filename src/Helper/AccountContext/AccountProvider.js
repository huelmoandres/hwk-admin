import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import AccountContext from ".";
import request, { requestV1 } from "../../Utils/AxiosUtils";
import { selfData, usersV1 } from "../../Utils/AxiosUtils/API";

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
    setAccountData(data);
  }, [isLoading, cookies.access_token, cookies.refresh_token]);

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
