"use client";
import { useContext } from "react";
import { Container } from "reactstrap";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { setEncryptedItem } from "@/Utils/CustomFunctions/encrypted-storage";
import SettingContext from "@/Helper/SettingContext";

const Layout = (props) => {
  const { darkMode, setDarkMode } = useContext(SettingContext);

  const setModeLocalStorage = () => {
    setEncryptedItem("mode", !darkMode).then(() => setDarkMode((prev) => !prev));
  }

  return (
    <>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header setMode={setModeLocalStorage} mode={darkMode} settingData={"settingData"} />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">
            <Container fluid={true}>{props.children}</Container>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
