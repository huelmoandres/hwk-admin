import { Col, TabContent, TabPane } from "reactstrap";
import GeneralTab from "../GeneralTab";
import InventoryTab from "../InventoryTab";
import ProductImageTab from "../ProductImageTab";
import { generateTitleList } from "./tittleList";
import { useEffect } from "react";

const AllProductTabs = ({
  setErrors,
  setTouched,
  values,
  setFieldValue,
  errors,
  updateId,
  activeTab,
  isSubmitting,
  setActiveTab,
  touched,
}) => {

  useEffect(() => {
    let productTabs = generateTitleList(values)
      .map((main) => main.inputs.filter((item) => errors[item] && touched[item]))
      .findIndex(
        (innerArray) =>
          Array.isArray(innerArray) && innerArray.some((item) => typeof item == "string")
      );

    if (productTabs !== -1 && activeTab !== productTabs + 1) {
      setActiveTab(String(productTabs + 1));
    }
  }, [isSubmitting]);

  return (
    <Col xl="7" lg="8">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className="some">
            <GeneralTab values={values} setFieldValue={setFieldValue} updateId={updateId} />
          </TabPane>
          <TabPane tabId="2">
            <ProductImageTab
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              updateId={updateId}
            />
          </TabPane>
          <TabPane tabId="3">
            <InventoryTab
              setErrors={setErrors}
              setTouched={setTouched}
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
              updateId={updateId}
              touched={touched}
            />
          </TabPane>
        </TabContent>
    </Col>
  );
};

export default AllProductTabs;
