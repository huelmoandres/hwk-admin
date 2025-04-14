import {
  nameSchema, requiredSchema,
} from "@/Utils/Validation/ValidationSchemas";

export const EventValidationSchema = (t) => ({
  title: requiredSchema(t, { field: t("event:form.formTitle") }),
  description: requiredSchema(t, { field: t("event:form.formDescription") }),
});