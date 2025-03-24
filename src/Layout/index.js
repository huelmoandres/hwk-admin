"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ConvertPermissionArr from "../Utils/CustomFunctions/ConvertPermissionArr";
import { replacePath } from "../Utils/CustomFunctions/ReplacePath";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const [mode, setMode] = useState(false);
  const [ltr, setLtr] = useState(true);

  useEffect(() => {
    mode ? document.body.classList.add("dark-only") : document.body.classList.remove("dark-only");
  }, [mode, ltr]);

  useEffect(() => {
    document.body.classList.add("version=1.0.0");
  }, []);

  return (
    <>
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header setMode={setMode} mode={mode} setLtr={setLtr} settingData={"settingData"} />
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
