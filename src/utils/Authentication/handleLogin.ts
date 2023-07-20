import { AxiosError } from "axios";
import { login } from "../../api/userAuthApi";
import { validateEmail, validateUsername } from "../formValidators";
import { User } from "../../dtos/User";


interface LoginState {
  UseruserCredential: string;
  UseruserPassword: string;
  setError: (field: string, errors: string[]) => void;
}

export const handLogin = async({ UseruserCredential, UseruserPassword, setError }: LoginState): Promise< boolean | User | AxiosError> => {
  const credential = UseruserCredential.trim();
  const password = UseruserPassword.trim();

  const isEmailFormat = validateEmail(credential);
  if (!isEmailFormat && !validateUsername(credential)) {
    setError("credential", ["Provide a valid email or username"],);
    return false;
  }
  if (!password.length) {
    setError("password", ["Field is required"]);
    return false;
  }
  try {
    const user: User | Error = await login({ credential, password });
    return Promise.resolve(user as User);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
}
  
