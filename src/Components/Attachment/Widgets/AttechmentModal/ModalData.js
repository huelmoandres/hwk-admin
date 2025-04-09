import NoDataFound from "@/Components/CommonComponent/NoDataFound";
import { mimeImageMapping } from "@/Data/MimeImageType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";

const ModalData = ({ state, dispatch, multiple, attachmentsData, refetch, redirectToTabs }) => {
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    const onlyId =
      state?.selectedImage?.length > 0 && state?.selectedImage?.map((data) => data?.asset_id);
    setSelectedId(onlyId);
  }, []);

  const ChoseImages = (e, item) => {
    if (multiple) {
      if (!e.target.checked) {
        let removeDuplicatesImage = [...state.selectedImage];
        removeDuplicatesImage = removeDuplicatesImage.filter((el) => {
          return el.asset_id !== item.asset_id;
        });
        dispatch({
          type: "SELECTEDIMAGE",
          payload: state?.selectedImage?.length > 0 ? removeDuplicatesImage : [item],
        });
        const updatedId = removeDuplicatesImage?.map((data) => data?.asset_id);
        setSelectedId(updatedId);
      } else {
        dispatch({
          type: "SELECTEDIMAGE",
          payload: state?.selectedImage?.length > 0 ? [...state.selectedImage, item] : [item],
        });
        setSelectedId((prev) => (Array.isArray(prev) ? [...prev, item?.asset_id] : [item?.asset_id]));
      }
    } else {
      dispatch({ type: "SELECTEDIMAGE", payload: [item] });
      setSelectedId(item.asset_id);
    }
  };
  const getMimeTypeImage = (result) => mimeImageMapping[result?.mime_type] ?? result?.secure_url;

  return (
    <>
      {attachmentsData?.length > 0 ? (
        attachmentsData?.map((elem, i) => (
          <div key={i}>
            <div className="library-box">
              <Input
                type="checkbox"
                id={elem.asset_id}
                onChange={(e) => ChoseImages(e, elem)}
                checked={(Array.isArray(selectedId) ? selectedId : [selectedId]).includes(elem.asset_id)}
              />
              <Label htmlFor={elem.asset_id}>
                <div className="ratio ratio-1x1">
                  <Image
                    src={getMimeTypeImage(elem)}
                    className="img-fluid"
                    alt="ratio image"
                    height={100}
                    width={100}
                  />
                </div>
              </Label>
            </div>
          </div>
        ))
      ) : (
        <NoDataFound noImage={false} title={"NoMediaFound"} />
      )}
      {}
    </>
  );
};

export default ModalData;
