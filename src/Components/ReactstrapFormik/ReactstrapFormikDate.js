"use client"

import { FormFeedback, Input, Label } from "reactstrap"
import { handleModifier } from "@/Utils/Validation/ModifiedErrorMessage"
import { Calendar } from "react-date-range"
import { useTranslation } from "react-i18next"
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import useOutsideDropdown from "@/Utils/Hooks/CustomHooks/useOutsideDropdown";

const ReactstrapFormikDate = ({ field: { ...fields }, form: { touched, errors, setFieldValue, values }, ...props }) => {
  const { t } = useTranslation()
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();

  const handleInputClick = () => {
    setIsComponentVisible((prev) => (prev !== fields.name ? fields.name : ""))
  }

  // Manejar la selección de fecha en el calendario
  const handleDateChange = (date) => {
    setFieldValue(fields.name, date)
    setIsComponentVisible("")
  }

  return (
    <>
      <div ref={ref}>
          <Input
            {...props}
            {...fields}
            value={
              values[fields.name] === null || values[fields.name] === "" || values[fields.name] === undefined
                ? values[fields.name]
                : dateFormate(values[fields.name], true)
            }
            onClick={handleInputClick}
            invalid={Boolean(touched[fields.name] && errors[fields.name])}
            valid={Boolean(touched[fields.name] && !errors[fields.name])}
            autoComplete="off"
            readOnly
          />
          <Label htmlFor={props.id}>{t(props.label)}</Label>
          {touched[fields.name] && errors[fields.name] ? (
            <FormFeedback>{t(handleModifier(errors[fields.name]).split(" ").join(""))}</FormFeedback>
          ) : (
            ""
          )}
        {isComponentVisible === fields.name && (
          <div className="calendar-popup position-absolute bg-white shadow-lg rounded" style={{
            zIndex: "9999",
          }}>
            <Calendar
              date={fields.value}
              onChange={handleDateChange}
              color="#0066ff"
              maxDate={props.maxDate ? new Date(props.maxDate) : undefined}
              minDate={props.minDate ? new Date(props.minDate) : undefined}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ReactstrapFormikDate