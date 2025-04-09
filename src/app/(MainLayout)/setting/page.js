"use client";
import SettingForm from "@/Components/Setting/SettingForm";
import { settingsV1, updateSettingsV1 } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import useUpdate from "@/Utils/Hooks/useUpdate";

const Setting = () => {
  const { mutate, isLoading } = useUpdate(updateSettingsV1, false, "Configuracion guardada correctamente.", undefined, settingsV1);
  return <SettingForm mutate={mutate} loading={isLoading} title={"Settings"} />;
};

export default Setting;
