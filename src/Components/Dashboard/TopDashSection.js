import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import request from "../../Utils/AxiosUtils";
import { StatisticsCountAPI } from "../../Utils/AxiosUtils/API";
import OrderStatus from "./OrderStatus";
import useStatistics from "@/Utils/Hooks/Statistics/useStatistics";
import Loader from "../CommonComponent/Loader";

const TopDashSection = ({ role }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  const { data, isLoading } = useStatistics();

  console.log("aca data", data);

  if (isLoading) <Loader />

  return (
    <section className="dashboard-tiles">
      <Container fluid={true} className="p-0">
        <Row className="g-sm-4 g-3">
          <Col md="4" className="welcome-tiles">
            <Card className="m-0">
              <Image
                height={162}
                width={497}
                src={"/assets/images/bg.jpg"}
                className="img-fluid"
                alt="box-time"
              />
              <CardBody>
                <h2>{t("WelcomeBackAdmin")}</h2>
                <p>
                  {t(
                    "ManageApplication'sDataAndOperationsWithRealTimeAnalytics,UserManagementToolsAndCustomizableReports"
                  )}
                  .
                </p>
              </CardBody>
            </Card>
          </Col>
          {/* <OrderStatus
            setFilterValue={setFilterValue}
            data={data}
            filterType={filterType}
            setFilterType={setFilterType}
          /> */}
          <Col md={8} className="card-bottom-space">
            <Row className="row-cols-md-12 row-cols-1 g-sm-4 g-3">
              <Col sm={12} md={6} className="widget-card-box">
                <a className="widget-card card mb-0">
                  <div className="widget-icon">
                    <Image
                      height={26}
                      width={26}
                      src={"/assets/images/svg/empty-wallet.svg"}
                      className="img-fluid"
                      alt="emptyWallet"z
                    />
                  </div>
                  <div>
                    <h6>{t("TotalRevenue")}</h6>
                    <h2>{convertCurrency(data?.total_revenue || 0, true)}</h2>
                  </div>
                </a>
              </Col>
              <Col sm={12} md={6} className="widget-card-box">
                <Link href={`/product`} className="widget-card card mb-0">
                  <div className="widget-icon">
                    <Image
                      height={26}
                      width={26}
                      src={"/assets/images/svg/receipt-2.svg"}
                      className="img-fluid"
                      alt="receipt2"
                    />
                  </div>
                  <div>
                    <h6>{t("TotalProducts")}</h6>
                    <h2>{data?.total_products}</h2>
                  </div>
                </Link>
              </Col>
              <Col sm={12} md={6} className="widget-card-box">
                <Link href={`/order`} className="widget-card card mb-0">
                  <div className="widget-icon">
                    <Image
                      height={26}
                      width={26}
                      src={"/assets/images/svg/medal-star.svg"}
                      className="img-fluid"
                      alt="medal-star"
                    />
                  </div>
                  <div>
                    <h6>{t("TotalOrders")}</h6>
                    <h2>{data?.total_orders}</h2>
                  </div>
                </Link>
              </Col>
              <Col sm={12} md={6} className="widget-card-box">
                <Link href={`/store`} className="widget-card card mb-0">
                  <div className="widget-icon">
                    <Image
                      height={26}
                      width={26}
                      src={"/assets/images/svg/shop-white.svg"}
                      className="img-fluid"
                      alt="shop-white"
                    />
                  </div>
                  <div>
                    <h6>{t("TotalStores")}</h6>
                    <h2>{data?.total_stores}</h2>
                  </div>
                </Link>
              </Col>
              <Col sm={12} md={6} className="widget-card-box">
                <Link href={`/user`} className="widget-card card">
                  <div className="widget-icon">
                    <Image
                      height={26}
                      width={26}
                      src={"/assets/images/svg/people.svg"}
                      className="img-fluid"
                      alt="people"
                    />
                  </div>
                  <div>
                    <h6>{t("TotalUser")}</h6>
                    <h2>{data?.total_users}</h2>
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopDashSection;
