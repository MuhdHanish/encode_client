import React, { useState, useEffect } from "react";
import { apiError } from "../../../api/ApiInterface";
import handleForm from "../../../utils/handleFormState";
import CredentialField from "../AuthenticationComponents/Login/CredentialFeild";
import { toast } from "react-toastify";
import {
  AtuhenticationError,
  PasswordField,
} from "../AuthenticationComponents/Common";
import { handleConfirmOtp, handleForgotVerify, hanldeResetPassword } from "../../../utils/Authentication/handleForgotPassword";
import { OtpField } from "../AuthenticationComponents/Signup";
import { BsArrowLeftShort } from "react-icons/bs";

interface ResetProps {
  loginError: string;
  setResError: (value: string) => void;
  setIsForgot: (value: boolean) => void;
}

const Reset: React.FC<ResetProps> = ({ loginError, setResError, setIsForgot }) => {
  const [uId, setUId] = useState<string>("");
  const [enteredOtp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpValidity, setOtpValidity] = useState<number>(120);
  const [isOtpSended, setIsOtpSended] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loginState, setLoginState] = handleForm({
    credential: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    field: string;
    errors: string[];
  } | null>({
    field: "",
    errors: [""],
  });
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOtpSended && otpValidity > 0) {
      timer = setInterval(() => {setOtpValidity((prevValidity) => prevValidity - 1)}, 1000);
    }
    return () => {if (timer) {clearInterval(timer);}};
  }, [isOtpSended, otpValidity]);

  const handleForgetRequest = (event: React.FormEvent<HTMLFormElement>|React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setResError("")
    event.preventDefault();
    handleForgotVerify({UseruserCredential: loginState.credential as string,setError})
      .then((res) => {
        setLoading(false);
        if (res) {
            setIsOtpSended(true),
            setUId(res as string),
            setOtpValidity(120),
            setResError("");
        }
      })
      .catch((err: apiError) => {
        setLoading(false), setIsOtpSended(false), setResError(err.message);
      });
  };
  const confirmOtp = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
     setLoading(true);
     setResError("");
    event.preventDefault();
    handleConfirmOtp({ UserenteredOtp: enteredOtp, uId, setError }).then((res) => {
      setLoading(false);
     if (res) {
       setIsOtpSended(false);
       setIsVerified(true);
     }
      }).catch((err: apiError) => {
        setLoading(false), setResError(err.message);
      });
   }
   const resetPassword = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setResError("");
    event.preventDefault();
     hanldeResetPassword({ UseruserCredential: loginState.credential as string, UseruserPassword: loginState.password as string, setError })
      .then((res) => {
      setLoading(false);
      if (res) {
        toast.success("Password reset successfull!", {
          position: "top-right", autoClose: 500, hideProgressBar: false, closeOnClick: true,
          pauseOnHover: true, draggable: true, progress: undefined,
        });
        setTimeout(() => {
          setIsForgot(false);
        }, 500)
      }
      }).catch((err: apiError) => {
        setLoading(false), setResError(err.message);
      });
   };

  return (
    <div>
      <form
        onSubmit={
          isVerified
            ? resetPassword
            : isOtpSended
            ? confirmOtp
            : handleForgetRequest
        }
      >
        <div className="flex flex-col justify-center gap-3 px-5 py-2">
          <div className="flex flex-col gap-2">
            {isOtpSended && (
              <OtpField
                enteredOtp={enteredOtp}
                setEnteredOtp={setOtp}
                handleStepOne={handleForgetRequest}
                errors={errors}
                otpValidity={otpValidity}
                setErrors={setErrors}
              />
            )}
            {!isVerified && !isOtpSended && (
              <CredentialField
                setLoginState={setLoginState}
                errors={errors}
                loginState={loginState}
                setErrors={setErrors}
              />
            )}
            {isVerified && (
              <PasswordField
                setPassedState={setLoginState}
                errors={errors}
                passedState={loginState}
                setErrors={setErrors}
              />
            )}
            {loginError && <AtuhenticationError passedError={loginError} />}
          </div>
          <div className="flex flex-col items-center ">
            {loading && <div className="loaderBar"></div>}
            {
              <button
                className="btn-class w-full flex justify-center items-center gap-2"
                type="submit"
              >
                Confirm
              </button>
            }
          </div>
          <div className="flex w-full h-fit justify-start items-center  text-[13px] text-primary ">
            <span
              className="cursor-pointer w-fit h-fit flex"
              onClick={() => setIsForgot(false)}
            >
              {" "}
              <BsArrowLeftShort style={{ fontSize: "20px" }} />{" "}
              <span>Back</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reset;
