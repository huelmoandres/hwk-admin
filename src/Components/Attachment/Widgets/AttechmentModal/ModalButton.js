import { useTranslation } from "react-i18next";
import Btn from "../../../../Elements/Buttons/Btn";

const ModalButton = ({
  setModal,
  dispatch,
  state,
  name,
  setSelectedImage,
  setFieldValue,
  tabNav,
  multiple,
  isLoading
}) => {
  const { t } = useTranslation("common");
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
          value.map(() => {
            state.selectedImage && setSelectedImage([...state.selectedImage]);
            state.selectedImage &&
              setFieldValue(
                name,
                state.selectedImage.map((elemmm) => elemmm)
              );
          });
      } else {
        if (state?.selectedImage?.length > 0) {
          setFieldValue(
            name,
            value[0]
          );
          setSelectedImage([
            value[0]
          ]);
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
