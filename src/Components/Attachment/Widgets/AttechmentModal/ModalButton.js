import { useTranslation } from "react-i18next";
import Btn from "../../../../Elements/Buttons/Btn";

const ModalButton = ({
  setModal,
  attachmentsData,
  dispatch,
  state,
  name,
  setSelectedImage,
  setFieldValue,
  tabNav,
  multiple,
  isLoading,
  showImage
}) => {
  const { t } = useTranslation("common");
  const storeImageObject = name?.split("_id")[0];
  const handleClick = (value) => {
    if (tabNav == 2) {
      if (state.setBrowserImage) {
        let formData = new FormData();
        Object.values(state.setBrowserImage.attachments).forEach((el, i) => {
          formData.append(`attachments[${i}]`, el);
        });
      }
    } else {
      if (multiple) {
        value &&
          value.map((element) => {
            state.selectedImage && setSelectedImage([...state.selectedImage]);
            state.selectedImage &&
              setFieldValue(
                name,
                state.selectedImage.map((elemmm) => elemmm.asset_id)
              );
          });
      } else {
        if (state?.selectedImage?.length > 0) {
          if (showImage) {
            setFieldValue(name, value[0].secure_url);
          } else {
            setFieldValue(
              name,
              attachmentsData?.find((item) => {
                return item.asset_id == value[0]?.asset_id;
              }).id
            );
            storeImageObject &&
              setFieldValue(
                storeImageObject,
                attachmentsData?.find((item) => {
                  return item.asset_id == value[0]?.asset_id;
                })
              );
            setSelectedImage([
              attachmentsData?.find((item) => {
                return item.asset_id == value[0]?.asset_id;
              }),
            ]);
          }
        }
      }
    }
    setModal(false);
  };
  return (
    <>
      <div className="media-bottom-btn">
        <div className="left-part">
          <div className="file-detail">
            <h6>
              {state.selectedImage?.length || 0} {t("FileSelected")}
            </h6>
            <a
              href="#"
              className="font-red"
              onClick={() => dispatch({ type: "SELECTEDIMAGE", payload: [] })}
            >
              {t("Clear")}
            </a>
          </div>
        </div>
        <div className="right-part">
          <Btn
            type="submit"
            className="btn btn-solid"
            title={tabNav === 2 ? "Submit" : t("InsertMedia")}
            loading={Number(isLoading)}
            onClick={() => handleClick(state.selectedImage)}
          />
        </div>
      </div>
    </>
  );
};

export default ModalButton;
