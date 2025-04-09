import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";

const SocialTab = () => {
  const { t } = useTranslation("settings");
  return (
      <>
        <SimpleInputField
          nameList={[
            {
              name: "facebookUrl",
              title: t("form.formFacebookUrl"),
              placeholder: t("form.placeholderFacebookUrl"),
            },
            {
              name: "instagramUrl",
              title: t("form.formInstagramUrl"),
              placeholder: t("form.placeholderInstagramUrl"),
            },
            {
              name: "twitterUrl",
              title: t("form.formTwitterUrl"),
              placeholder: t("form.placeholderTwitterUrl"),
            },
            {
              name: "youtubeUrl",
              title: t("form.formYoutubeUrl"),
              placeholder: t("form.placeholderYoutubeUrl"),
            },
          ]}
        />
      </>
  );
};

export default SocialTab;
