import { mimeImageMapping } from "@/Data/MimeImageType";
import { ErrorMessage } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputWrapper from "../../Utils/HOC/InputWrapper";
import { handleModifier } from "@/Utils/Validation/ModifiedErrorMessage";
import AttachmentModal from "../Attachment/Widgets/AttechmentModal";
import { Input } from "reactstrap";
import { RiCloseLine } from "react-icons/ri";
import { isVideoUrl } from "@/Utils/Validation/IsVideo";
import { getCloudinaryVideoThumbnail } from "@/Utils/CustomFunctions/cloudinary";

const FileUploadField = ({
  values,
  updateId,
  setFieldValue,
  errors,
  multiple,
  loading,
  showImage,
  paramsProps,
  addMoreFiles,
  deleteFiles,
  ...props
}) => {
  const { t } = useTranslation("common");
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    if (values && values[props.name]) {
      if (multiple) {
        setSelectedImage(values[props.name]);
      } else {
        setSelectedImage([values[props.name]]);
      }
    }
  }, []);

  const getMimeTypeImage = (result) => {
    if (isVideoUrl(result)) {
      return getCloudinaryVideoThumbnail(result);
    }
    if (typeof result === "string") {
      return result;
    }
    return (mimeImageMapping[result?.mime_type] ?? result?.secureUrl?.split("/")[1] == "storage")
      ? result?.secureUrl
      : result?.secureUrl ?? result?.secure_url;
  };

  const removeImage = (result) => {
    if (Array.isArray(selectedImage) && selectedImage.length > 0 && result) {
      let updatedImage = selectedImage.filter((elem) => elem !== result);
      const images = updatedImage && updatedImage.length > 0 ? updatedImage : []
      setSelectedImage(images);
      setFieldValue(props.name, images);
    }
  };

  const ImageShow = () => {
    return (
      <>
        {selectedImage?.length > 0 &&
          selectedImage?.map((result, i) => (
            <li key={i}>
              <div className="media-img-box">
                <Image
                  src={getMimeTypeImage(result)}
                  className="img-fluid"
                  alt="ratio image"
                  height={130}
                  width={130}
                />
                {deleteFiles && (
                  <p className="remove-icon">
                    <RiCloseLine onClick={() => removeImage(result)} />
                  </p>
                )}
              </div>
              <h6>{result?.file_name}</h6>
            </li>
          ))}
      </>
    );
  };

  return (
    <>
      <ul className={`image-select-list`}>
        {addMoreFiles && (
          <li className="choosefile-input">
            <Input
              {...props}
              onClick={(event) => {
                event.preventDefault();
                setModal(props.id);
              }}
            />
            <label htmlFor={props.id}>
              <Image height={40} width={40} src={"/assets/images/add-image.png"} className="img-fluid" alt="" />
            </label>
          </li>
        )}

        <ImageShow />

        {modal === props.id && (
          <AttachmentModal
            paramsProps={paramsProps}
            modal={modal === props.id}
            name={props.name}
            multiple={multiple}
            values={values}
            setModal={setModal}
            setFieldValue={setFieldValue}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            showImage={showImage}
            redirectToTabs={true}
          />
        )}
      </ul>
      <p className="help-text">{props?.helpertext}</p>
      {errors?.[props?.name] ? (
        <ErrorMessage
          name={props.name}
          render={(msg) => (
            <div className="invalid-feedback d-block">
              {t(handleModifier(props.name).split(" ").join(""))} {t("IsRequired")}
            </div>
          )}
        />
      ) : null}
    </>
  );
};

export default InputWrapper(FileUploadField);
