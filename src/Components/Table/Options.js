import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import NoSsr from "../../Utils/HOC/NoSsr";
import AnswerModal from "../Q&A/Widgets/AnswerModal";
import DeleteButton from "./DeleteButton";
import ViewDetails from "./ViewDetails";

const Options = ({
  fullObj,
  mutate,
  type,
  moduleName,
  optionPermission,
  refetch,
  keyInPermission,
}) => {
  const pathname = usePathname();
  const [modal, setModal] = useState(false);

  return (
    <div className="custom-ul">
      <NoSsr>
        {optionPermission?.optionHead.type == "View" ? (
          <ViewDetails
            fullObj={fullObj}
            tableData={optionPermission?.optionHead}
            refetch={refetch}
          />
        ) : (
          <>
            <div>
              {keyInPermission == "question_and_answer" ? (
                <a onClick={() => setModal(true)}>
                  <RiPencilLine />
                </a>
              ) : (
                fullObj?.slug &&
                !optionPermission?.noEdit && (
                  <>
                    {optionPermission?.editRedirect ? (
                      <Link href={`/` + optionPermission?.editRedirect + "/view/" + fullObj.slug}>
                        <RiPencilLine />
                      </Link>
                    ) : type == "post" && moduleName?.toLowerCase() == "tag" ? (
                      <Link href={`/${pathname.split("/")[1]}/tag/edit/${fullObj.slug}`}>
                        <RiPencilLine />
                      </Link>
                    ) : type == "post" ? (
                      <Link href={`/${pathname.split("/")[1]}/category/edit/${fullObj.slug}`}>
                        <RiPencilLine />
                      </Link>
                    ) : (
                      <Link href={`/${pathname.split("/")[1]}/edit/${fullObj.slug}`}>
                        <RiPencilLine />
                      </Link>
                    )}
                  </>
                )
              )}
            </div>
            <div>
              {!optionPermission?.noDelete && (
                <DeleteButton id={fullObj?.slug} mutate={mutate} />
              )}
            </div>
          </>
        )}
        {modal && <AnswerModal fullObj={fullObj} modal={modal} setModal={setModal} />}
      </NoSsr>
    </div>
  );
};

export default Options;
