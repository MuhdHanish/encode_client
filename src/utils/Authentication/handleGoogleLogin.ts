import { AxiosError } from "axios";
import { User } from "../../dtos/User";
import { googleLogin } from "../../api/userAuthApi";
import { GoogleCredentialResponse } from "@react-oauth/google";

export const handleGoogleLogin = async(credentialReponse: GoogleCredentialResponse) => {
  try {
    const user: User | Error = await googleLogin(credentialReponse);
     return Promise.resolve(user as User);
  } catch (error) {
     const err = error as AxiosError;
     return Promise.reject(err.response?.data);
  }
  
}
