import React from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { GoVerified } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const MySwal = withReactContent(Swal);

interface ConfirmationProps {
  message: string;
  onConfirm: (id: string) => void;
  id: string;
  children: React.ReactNode;
}

const ConfirmationComponent: React.FC<ConfirmationProps> = ({
  message,
  onConfirm,
  children,
  id,
}) => {
  const handleConfirmation = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const result = await MySwal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#9d4de6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${message}`,
      position: "top-end",
      width:'300px',
      timer: 3000,
      customClass: {
        container: "my-swal",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.isConfirmed) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      MySwal.fire({
        html: (
          <div className="flex gap-3 items-center justify-center w-fit h-fit">
            <span className="text-[15px] text-center font-semibold">Action Confirmed</span>
            <span><GoVerified style={{color:"green", fontSize:"18px"}} /></span>
          </div>
        ),
        showConfirmButton: false,
        position: "top-end",
        width: "250px",
        timer:1200,
        customClass: {
          container: "my-swal",
        },
      });
      onConfirm(id);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      MySwal.fire({
        html: (
          <div className="flex gap-3 items-center justify-center w-fit h-fit">
            <span className="text-[15px] text-center font-semibold">Action Canceled</span>
            <span>
              <CiCircleRemove style={{ color: "red", fontSize: "18px" }} />
            </span>
          </div>
        ),
        showConfirmButton: false,
        position: "top-end",
        width: "250px",
        timer: 1200,
        customClass: {
          container: "my-swal",
        },
      });
      // You can handle cancellation here if needed
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <div onClick={() => handleConfirmation()}>{children}</div>;
};

export default ConfirmationComponent;
