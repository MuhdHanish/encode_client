import { axiosInstance } from "./config";

import { store } from "../redux/store";
import { saveUser } from "../redux/userSlice/userSlice";
import { User } from "../dtos/User";

interface UserCredentials {
 credential?: string,
 email?: string,
 username?: string,
 enteredOtp?:string,
 password?: string ,
 role?: string,
 uId?:string,
}

interface ResponseData {
 uId?:string,
 user?: User;
 accessToken?: string, 
 refreshToken?: string
}

const login = async ({ credential, password }:UserCredentials): Promise<User|Error> => {
  try {
    const response = await axiosInstance.post(`/login`, { identifier: credential, password });
    const { user, accessToken, refreshToken } = response.data as ResponseData;
    localStorage.setItem("accessToken", accessToken as string);
    localStorage.setItem("refreshToken", refreshToken as string);
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
   return Promise.reject(error);
  }
}

const registerStepOne = async ({ email, username, role }: UserCredentials): Promise<string | Error> => {
  try {
    const response = await axiosInstance.post(`/register/stepone`, { username, email, role });
    const { uId } = response.data as ResponseData;
    return Promise.resolve(uId as string);
  } catch (error) {
    return Promise.reject(error);
  }
}


const registerStepTwo = async ({ email,username,password,role,uId ,enteredOtp }:UserCredentials): Promise<User|Error> => {
  try {
    const response = await axiosInstance.post(`/register/steptwo/${uId as string}`, { username,email,password,role,enteredOtp });
    const { user, accessToken, refreshToken } = response.data as ResponseData;
    localStorage.setItem(accessToken as string, "accessToken");
    localStorage.setItem(refreshToken as string,"refreshToken");
    localStorage.setItem(JSON.stringify(user),"user");
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
   return Promise.reject(error);
  }
}

export { registerStepOne, registerStepTwo, login };