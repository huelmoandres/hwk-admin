import { useEffect, useState } from "react";
import { getEncryptedItem } from "@/Utils/CustomFunctions/encrypted-storage";

export const useDarkLightMode = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(false);

  useEffect(() => {
    const mode = async (): Promise<boolean | null> => {
      return await getEncryptedItem("mode");
    }
    mode().then((res)=> setDarkMode(res));
  }, []);

  return darkMode;
}