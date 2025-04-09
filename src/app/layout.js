import TanstackWrapper from "@/Layout/TanstackWrapper";
import { dir } from "i18next";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "../../public/assets/scss/app.scss";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import { settingsV1 } from "@/Utils/AxiosUtils/API";

export async function generateMetadata() {
  const settingData = await fetch(`${process.env.API_PROD_URL}${settingsV1}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log("err", err));

  return {
    metadataBase: new URL(process.env.API_PROD_URL_V1),
    title: settingData?.data?.siteName,
    description: settingData?.data?.siteDescription,
    icons: {
      icon: settingData?.data?.faviconPath,
    },
  };
}

export default async function RootLayout({ children }) {
  const lng = await detectLanguage();

  // 🔹 Fetch desde el servidor
  const settingData = await fetch(`${process.env.API_PROD_URL}${settingsV1}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error al obtener settings", err);
      return null;
    });

  const primaryColor = settingData?.data?.primaryColor || "#ec8951";

  return (
    <I18nProvider language={lng}>
      <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ ["--theme-color"]: primaryColor }} // 🎯 Setea la var desde el SSR
      >
      <TanstackWrapper>{children}</TanstackWrapper>
      <ToastContainer position="top-center" />
      <NextTopLoader />
      </body>
      </html>
    </I18nProvider>
  );
}
