import { AxiosError } from "axios";
import { registerStepOne, registerStepTwo } from "../../api/userAuthApi";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateOtp
} from "../formValidators";
import { User } from "../../dtos/User";

interface SignupState {
  Userusername: string;
  Useremail: string;
  Userpassword: string;
  UserenteredOtp?: string
  uId?:string
  role: string;
  setError: (field: string, errors: string[]) => void;
}

export const handleSignupStepOne = async ({
  Userusername,
  Useremail,
  Userpassword,
  role,
  setError
}: SignupState): Promise<string| boolean | AxiosError> => {
  const username: string = Userusername.trim();
  const email: string = Useremail.trim();
  const password: string = Userpassword.trim();

  if (!validateUsername(username)) {
    setError("username", ["Provide a valid username"]);
    return false
  }

  if (!validateEmail(email)) {
    setError("email", ["Provide a valid email address"]);
    return false
  }

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
    const uId = await registerStepOne({ email, username, role });
    return Promise.resolve(uId as string);
  } catch (error) {
    const err = error as AxiosError;
    return  Promise.reject(err.response?.data);
  }
}

export const handleSignupStepTwo = async({
  Userusername,
  Useremail,
  Userpassword,
  UserenteredOtp,
  role,
  uId,
  setError
}: SignupState): Promise<boolean| User | AxiosError> => {
  const username: string = Userusername.trim();
  const email: string = Useremail.trim();
  const password: string = Userpassword.trim();
  const enteredOtp: string | undefined = UserenteredOtp?.trim();
  
  if (!validateOtp(enteredOtp as string)) {
    setError("enteredOtp", ["Contain max six digits"]);
    return false;
  }
  
  try {
    const user = await registerStepTwo({ email, username, password, role, uId, enteredOtp });
    return  Promise.resolve(user as User);
  } catch (error) {
    const err = error as AxiosError;
    return  Promise.reject(err.response?.data);
  }
}