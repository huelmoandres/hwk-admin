import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SettingContext from "../../../Helper/SettingContext";
import { useDarkLightMode } from "@/Utils/Hooks/CustomHooks/useDarkLightMode";

const Logo = () => {
  const [urlLogo, setUrlLogo] = useState(`/assets/images/settings/logo-white.png`);
  const { settingObj, darkMode } = useContext(SettingContext);

  useEffect(() => {
    if (settingObj) {
      setUrlLogo(darkMode ? settingObj.logoDarkPath : settingObj.logoLightPath);
    }
  }, [darkMode, settingObj]);

  return (
    <Link href="/dashboard">
      <Image
        className="for-white"
        src={urlLogo}
        alt={darkMode ? "Dark Logo" : "Light Logo"}
        width={1300}
        height={500}
        priority
      />
    </Link>
  );
};

export default Logo;
