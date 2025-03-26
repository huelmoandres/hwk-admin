import { Field } from "formik";
import InputWrapper from "../../Utils/HOC/InputWrapper";
import { ReactstrapDate } from "../ReactstrapFormik";

const InputDate = ({ name, ...rest }) => {
  return <Field type="text" name={name} id={name} {...rest} component={ReactstrapDate} />;
};
export default InputWrapper(InputDate);
