import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SettingContext from ".";
import { settingsV1, updateSettingsV1 } from "@/Utils/AxiosUtils/API";
import request, { requestV1 } from "../../Utils/AxiosUtils";
import { useRouter } from "next/navigation";
import { getEncryptedItem } from "@/Utils/CustomFunctions/encrypted-storage";

const SettingProvider = (props) => {
  const [settingObj, setSettingObj] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [searchSidebarMenu, setSearchSidebarMenu] = useState([]);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, refetch } = useQuery(
    [settingsV1],
    () => requestV1({ url: settingsV1 }, router),
    {
      select: (res) => res?.data,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setSettingObj(data);
    }
  }, [data]);

  useEffect( () => {
    async function changeMode(){
      const localStorageMode = await getEncryptedItem("mode");
      if (darkMode !== localStorageMode) {
        setDarkMode(localStorageMode);
      }
    }
    changeMode().then();
    document.body.classList.add("version=1.0.0");
  }, []);

  useEffect(() => {
    darkMode ? document.body.classList.add("dark-only") : document.body.classList.remove("dark-only");
  }, [darkMode]);

  return (
    <SettingContext.Provider
      value={{
        ...props,
        sidebarOpen,
        setSidebarOpen,
        searchSidebarMenu,
        setSearchSidebarMenu,
        settingObj,
        setSettingObj,
        darkMode,
        setDarkMode,
        refetch
      }}
    >
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
