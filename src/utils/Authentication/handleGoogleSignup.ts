import { AxiosError } from "axios";
import { User } from "../../dtos/User";
import { googleSignup } from "../../api/userAuthApi";
import { GoogleCredentialResponse } from "@react-oauth/google";

export const handleGoogleSignup = async (credentialReponse: GoogleCredentialResponse,role: string) => {
  try {
    const user: User | Error = await googleSignup(credentialReponse,role);
     return Promise.resolve(user as User);
  } catch (error) {
     const err = error as AxiosError;
     return Promise.reject(err.response?.data);
  }
  
}