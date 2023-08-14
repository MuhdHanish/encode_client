import { AxiosError } from "axios";
import { confirmOtpToResetPassword, requestForgotPassword, resetPassword } from "../../api/userAuthApi";
import { validateEmail, validateOtp, validatePassword, validateUsername } from "../formValidators";
import { User } from "../../dtos/User";

interface ResetPassState {
  UseruserCredential?: string;
  UseruserPassword?: string;
  setError: (field: string, errors: string[]) => void;
  UserenteredOtp?: string;
  uId?: string;
}

export const handleForgotVerify = async ({
  UseruserCredential,
  setError,
}: ResetPassState): Promise<string | boolean | AxiosError> => {
  const credential = UseruserCredential?.trim() as string;
  const isEmailFormat = validateEmail(credential);
  if (!isEmailFormat && !validateUsername(credential )) {
    setError("credential", ["Provide a valid email or username"]);
    return false;
  }
  try {
     const uId = await requestForgotPassword(credential);
     return Promise.resolve(uId as string);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
};
  
export const handleConfirmOtp = async ({ UserenteredOtp, uId, setError }: ResetPassState): Promise<string | boolean | AxiosError> => {
    const enteredOtp: string | undefined = UserenteredOtp?.trim();
    if (!validateOtp(enteredOtp as string)) {
      setError("enteredOtp", ["Contain max six digits"]);
      return false;
    }
  try {
    const message = await confirmOtpToResetPassword(enteredOtp as string, uId as string);
    return Promise.resolve(message as string);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
}

export const hanldeResetPassword = async ({ UseruserCredential, UseruserPassword, setError }: ResetPassState): Promise<User| boolean | AxiosError> => {
  const password: string = UseruserPassword?.trim() as string;
  const credential = UseruserCredential?.trim() as string;
    if (!validatePassword(password)) {
      setError("password", [
        "At least 8 characters",
        "One uppercase letter",
        "One lowercase letter",
        "One digit",
        "One special character",
      ]);
      return false;
    }
  try {
    const user = await resetPassword(credential, password);
    return Promise.resolve(user as User);
  } catch (error) {
     const err = error as AxiosError;
     return Promise.reject(err.response?.data);
  }
}
