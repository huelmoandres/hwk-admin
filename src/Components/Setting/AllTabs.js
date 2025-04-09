import { Col, TabContent, TabPane } from "reactstrap";
import EmailTab from "@/Components/Setting/EmailTab";
import GeneralTab from "@/Components/Setting/GeneralTab";
import SocialTab from "@/Components/Setting/SocialTab";
import CategoriesTab from "@/Components/Setting/CategoriesTab";

const AllTabs = ({ values, activeTab, setFieldValue, errors, touched }) => {
  return (
    <>
      <Col xl="7" lg="8">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} />
          </TabPane>
          <TabPane tabId="2">
            <EmailTab values={values} setFieldValue={setFieldValue} errors={errors} />
          </TabPane>
          <TabPane tabId="3">
            <SocialTab values={values} setFieldValue={setFieldValue} errors={errors} />
          </TabPane>
          <TabPane tabId="4">
            <CategoriesTab values={values} setFieldValue={setFieldValue} errors={errors} />
          </TabPane>
        </TabContent>
      </Col>
    </>
  );
};

export default AllTabs;
