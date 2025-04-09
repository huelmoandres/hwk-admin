import {
  nameSchema, requiredSchema,
} from "@/Utils/Validation/ValidationSchemas";
import * as Yup from "yup";

export const StoreValidationSchema = (t) => {
  const bothRequiredMessage = t("validation:requiredPhoneWithCode");

  return {
    name: requiredSchema(t, { field: t("store:form.formName") }),
    stateId: nameSchema,
    address: nameSchema,
    phone: Yup.string()
      .nullable()
      .min(5, t("validation:minLengthValidation", { field: t("form.formPhone"), min: 5 }))
      .max(15, t("validation:maxLengthValidation", { field: t("form.formPhone"), max: 15 }))
      .test({
        name: 'conditionalRequired',
        message: bothRequiredMessage,
        test: function(value) {
          const phoneCode = this.parent.phoneCode;
          if (value && value !== "") {
            return !!(phoneCode && phoneCode !== "");
          } else return (!value || value === "") && (!phoneCode || phoneCode === "");
        }
      }),
    phoneCode: Yup.number()
      .nullable()
  };
};