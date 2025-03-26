import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  modal?: ReactNode;
  children: ReactNode;
}

const FormWrapper = (props: FormWrapperProps) => {
  const { t } = useTranslation("common");
  
  return (
    <Row>
      <Col xxl="10" xl="10" className="m-auto">
        <Card>
          <CardBody>
            <div className="title-header option-title">
              <h5>{t(props.title)}</h5>
              {props.modal && props.modal}
            </div>
            {props.children}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default FormWrapper;