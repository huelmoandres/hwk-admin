import SearchableSelectInput from "../../InputFields/SearchableSelectInput";
import CheckBoxField from "../../InputFields/CheckBoxField";
import SimpleInputField from "../../InputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import InputDate from "@/Components/InputFields/DateField";

const CreateUser = ({ updateId, countries }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "name", placeholder: t("EnterFullName"), require: "true" },
          {
            name: "lastName",
            placeholder: t("EnterLastName"),
            require: "true",
          },
          {
            type: "email",
            name: "email",
            placeholder: t("EnterEmailAddress"),
            require: "true",
          },
        ]}
      />
      <div className="country-input mb-4">
        <SimpleInputField
          nameList={[
            {
              name: "phoneNumber",
              type: "number",
              placeholder: t("EnterPhoneNumber"),
              require: "true",
            },
          ]}
        />
        <SearchableSelectInput
          nameList={[
            {
              name: "phoneCode",
              notitle: "true",
              inputprops: {
                name: "phoneCode",
                id: "phoneCode",
                options: [{ id: 598, name: "+598", data: { class: "uy", code: "+598" } }],
              },
            },
          ]}
        />
      </div>
      <div>
        {!updateId && (
          <>
            <SimpleInputField
              nameList={[
                {
                  name: "password",
                  type: "password",
                  placeholder: t("EnterPassword"),
                  require: "true",
                },
                {
                  name: "password_confirmation",
                  title: "ConfirmPassword",
                  type: "password",
                  placeholder: t("EnterConfirmPassword"),
                  require: "true",
                },
              ]}
            />
          </>
        )}
      </div>

      <InputDate
        name={"birthDate"}
        placeholder={t("EnterBirthDate")}
        require="true"
        maxDate={new Date()}
      />

      <SearchableSelectInput
        nameList={[
          {
            name: "role",
            require: "true",
            title: "Role",
            inputprops: {
              name: "role",
              id: "role",
              options: [{ id: "admin", name: "admin" }, { id: "customer", name: "customer" }],
              defaultOption: "Select Role",
              initialTittle: "Select Role",
            },
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "country",
            require: "true",
            title: "Country",
            inputprops: {
              name: "country",
              id: "country",
              options: countries,
              defaultOption: "Seleccionar País",
              initialTittle: "Seleccionar País",
            },
          },
        ]}
      />
      <CheckBoxField name="isActive" title={t("IsActive")} />
    </>
  );
};

export default CreateUser;
