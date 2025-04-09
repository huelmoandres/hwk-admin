import React from "react";
import FileUploadField from "../InputFields/FileUploadField";
import { mediaConfig } from "@/Data/MediaConfig";

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  return (
    <>
      <FileUploadField
        paramsProps={{ mime_type: mediaConfig.image.join(",") }}
        errors={errors}
        name="product_thumbnail_id"
        id="product_thumbnail_id"
        title="Thumbnail"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
      />
      <FileUploadField
        paramsProps={{ mime_type: mediaConfig.image.join(",") }}
        errors={errors}
        name="product_galleries_id"
        id="product_galleries_id"
        title="Images"
        type="file"
        multiple={true}
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
      />
    </>
  );
};

export default ImagesTab;
