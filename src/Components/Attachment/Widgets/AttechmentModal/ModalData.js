import NoDataFound from "@/Components/CommonComponent/NoDataFound";
import { mimeImageMapping } from "@/Data/MimeImageType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import { RiImage2Fill, RiVideoFill } from "react-icons/ri";

const ModalData = ({ state, dispatch, multiple, attachmentsData }) => {
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    const onlyId =
      state?.selectedImage?.length > 0 && state?.selectedImage?.map((data) => data);
    setSelectedId(onlyId);
  }, []);

  const ChoseImages = (e, item) => {
    if (multiple) {
      if (!e.target.checked) {
        let removeDuplicatesImage = [...state.selectedImage];
        removeDuplicatesImage = removeDuplicatesImage.filter((el) => {
          return el !== item;
        });
        dispatch({
          type: "SELECTEDIMAGE",
          payload: state?.selectedImage?.length > 0 ? removeDuplicatesImage : [item],
        });
        const updatedId = removeDuplicatesImage?.map((data) => data);
        setSelectedId(updatedId);
      } else {
        dispatch({
          type: "SELECTEDIMAGE",
          payload: state?.selectedImage?.length > 0 ? [...state.selectedImage, item] : [item],
        });
        setSelectedId((prev) => (Array.isArray(prev) ? [...prev, item] : [item]));
      }
    } else {
      dispatch({ type: "SELECTEDIMAGE", payload: [item] });
      setSelectedId([item]);
    }
  };
  const getMimeTypeImage = (result) => result.thumbnail ?
    result.thumbnail : result?.secure_url ? result?.secure_url : mimeImageMapping[result?.resource_type] ?? null;

  return (
    <>
      {attachmentsData?.length > 0 ? (
        attachmentsData?.map((elem, i) => {
          return (<div key={i}>
            <div className="library-box">
              <Input
                type="checkbox"
                id={elem.asset_id}
                onChange={(e) => ChoseImages(e, elem.secure_url)}
                checked={(Array.isArray(selectedId) ? selectedId : [selectedId]).includes(elem.secure_url)}
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
                  {elem.resource_type && elem.resource_type === "image" ? (
                    <span><RiImage2Fill /></span>
                  ) : elem.resource_type && elem.resource_type === "video" ? (
                    <span><RiVideoFill /></span>
                  ) : null}
                </div>
              </Label>
            </div>
          </div>)
        })
      ) : (
        <NoDataFound noImage={false} title={"NoMediaFound"} />
      )}
      {}
    </>
  );
};

export default ModalData;
