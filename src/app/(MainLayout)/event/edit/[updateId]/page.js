"use client";
import { eventsV1 } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useUpdate from "@/Utils/Hooks/useUpdate";
import { useTranslation } from "react-i18next";
import EventForm from "@/Components/Event/EventForm";

const StoreUpdate = ({ params }) => {
  const { t } = useTranslation("event");
  const { mutate, isLoading } = useUpdate(
    params.updateId ? `${eventsV1}/${Array.isArray(params.updateId) ? params.updateId.join("/") : params.updateId}` : "",
    "/event",
    t("eventUpdated"),
    null,
    eventsV1
  );

  return (
    params?.updateId && (
      <FormWrapper title="EditStore">
        <EventForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          buttonName={t("updateButton")}
        />
      </FormWrapper>
    )
  );
};

export default StoreUpdate;
