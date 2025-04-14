"use client";
import StoreForm from "@/Components/Store/StoreForm";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import { useTranslation } from "react-i18next";
import useCreate from "@/Utils/Hooks/useCreate";
import { eventsV1 } from "@/Utils/AxiosUtils/API";
import EventForm from "@/Components/Event/EventForm";

const EventCreate = () => {
  const { t } = useTranslation("event");
  const { mutate, isLoading } = useCreate(eventsV1, '/event', t("eventSaved"), eventsV1);
  return (
    <FormWrapper title="AddEvent">
      <EventForm buttonName={t("saveButton")} mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default EventCreate;
