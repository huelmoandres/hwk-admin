import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import useStatistics from "@/Utils/Hooks/Statistics/useStatistics";
import Loader from "../CommonComponent/Loader";
import { RiProductHuntFill, RiProductHuntLine, RiTimer2Line, RiAccountCircleLine, RiAccountCircleFill} from "react-icons/ri";

const TopDashSection = ({ role }) => {
  const { t } = useTranslation(["common", "statistics"]);
  const { data, isLoading } = useStatistics();

  if (isLoading) {
    return <Loader />
  }

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
          {data && (
            <Col md={8} className="card-bottom-space">
              <Row className="row-cols-md-12 row-cols-1 g-sm-4 g-3">
                {data.ml && (
                  <>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiProductHuntFill
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:mlTotalProducts")}</h6>
                          <h2>{data.ml.totalProducts}</h2>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiProductHuntLine
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:mlActiveProducts")}</h6>
                          <h2>{data.ml.activeProducts}</h2>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
                {data.products && (
                  <>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiProductHuntFill
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:hwkProducts")}</h6>
                          <h2>{data.products.totalProducts}</h2>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiTimer2Line
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:countRecentProducts")}</h6>
                          <h2>{data.products.countRecentProducts}</h2>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
                {data.users && (
                  <>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiAccountCircleFill
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:totalUsers")}</h6>
                          <h2>{data.users?.totalUsers}</h2>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} md={6} className="widget-card-box">
                      <div className="widget-card card mb-0">
                        <div className="widget-icon">
                          <RiAccountCircleLine
                            style={{
                              fill: 'white',
                              width: 25
                            }}
                          />
                        </div>
                        <div>
                          <h6>{t("statistics:activeUsers")}</h6>
                          <h2>{data.users?.activeUsers}</h2>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TopDashSection;
