import React from "react";
import FileUploadField from "../InputFields/FileUploadField";
import { mediaConfig } from "@/Data/MediaConfig";

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  return (
    <>
      <FileUploadField
        errors={errors}
        name="thumbnail"
        id="thumbnail"
        title="Thumbnail"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
        deleteFiles={false}
        addMoreFiles={false}
      />
      <FileUploadField
        errors={errors}
        name="pictures"
        id="pictures"
        title="Images"
        type="file"
        multiple={true}
        values={values}
        setFieldValue={setFieldValue}
        deleteFiles={false}
        addMoreFiles={false}
      />
    </>
  );
};

export default ImagesTab;
