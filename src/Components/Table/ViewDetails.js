import { useRouter } from "next/navigation";
import { RiEyeLine } from "react-icons/ri";

const ViewDetails = ({ fullObj, tableData }) => {
  const router = useRouter();
  const redirectLink = () => {
    const productNumber = fullObj?.mlId;
    router.push(`${tableData?.redirectUrl}/view/${productNumber}`);
  };
  return (
    <>
      <div>
        <a
          onClick={() => {
            tableData?.redirectUrl ? redirectLink() : undefined;
          }}
        >
          <RiEyeLine className="ri-pencil-line" />
        </a>
      </div>
    </>
  );
};

export default ViewDetails;
