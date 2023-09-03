import {  axiosAuthorized, axiosInstance } from "./config";
import { store } from "../redux/store";
import { saveUser } from "../redux/userSlice/userSlice";
import { User } from "../dtos/User";
import { GoogleCredentialResponse } from "@react-oauth/google";

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
 users?: User[];
 accessToken?: string, 
 message?:string,
 refreshToken?: string
}

const login = async ({ credential, password }: UserCredentials): Promise<User | Error> => {
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
};

const registerStepOne = async ({ email, username, role }: UserCredentials): Promise<string | Error> => {
  try {
    const response = await axiosInstance.post(`/register/stepone`, { username, email, role });
    const { uId } = response.data as ResponseData;
    return Promise.resolve(uId as string);
  } catch (error) {
    return Promise.reject(error);
  }
};

const registerStepTwo = async ({ email, username, password, role, uId, enteredOtp }: UserCredentials): Promise<User | Error> => {
  try {
    const response = await axiosInstance.post(`/register/steptwo/${uId as string}`, { username, email, password, role, enteredOtp });
    const { user, accessToken, refreshToken } = response.data as ResponseData;
    localStorage.setItem("accessToken", accessToken as string);
    localStorage.setItem("refreshToken", refreshToken as string);
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const googleLogin = async (credentialResponse: GoogleCredentialResponse): Promise<User | Error> => {
  try {
    const response = await axiosInstance.post('/google/login', credentialResponse);
    const { user, accessToken, refreshToken } = response.data as ResponseData;
    localStorage.setItem("accessToken", accessToken as string);
    localStorage.setItem("refreshToken", refreshToken as string);
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const googleSignup = async (credentialResponse: GoogleCredentialResponse, role: string): Promise<User | Error> => {
  try {
    const credential = credentialResponse;
    const response = await axiosInstance.post('/google/register', { credential, role });
    const { user, accessToken, refreshToken } = response.data as ResponseData;
    localStorage.setItem("accessToken", accessToken as string);
    localStorage.setItem("refreshToken", refreshToken as string);
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUsers = async (): Promise<User[] | Error> => {
  try {
    const response = await axiosAuthorized.get("/admin/get/users");
    const { users } = response.data as ResponseData;
    return Promise.resolve(users as User[]);
  } catch (error) {
    return Promise.reject(error);
  }
};

const blockUser = async (userId:string): Promise<User | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/admin/block/user/${userId}`);
    const { user } = response.data as ResponseData;
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const unBlockUser = async (userId:string): Promise<User | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/admin/unblock/user/${userId}`);
    const { user } = response.data as ResponseData;
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const requestForgotPassword = async (credential: string): Promise<string | Error> => {
  try {
    const response = await axiosInstance.post(`/forgot/password`, { identifier: credential });
    const { uId } = response.data as ResponseData;
    return Promise.resolve(uId as string);
  } catch (error) {
    return Promise.reject(error);
  }
};

const confirmOtpToResetPassword = async (enteredOtp: string, uId: string): Promise<string | Error> => {
  try {
    const response = await axiosInstance.post(`/verify/password/request/${uId}`, { enteredOtp });
    const { message } = response.data as ResponseData;
    return Promise.resolve(message as string);
  } catch (error) {
    return Promise.reject(error);
  }
};

const resetPassword = async (credential: string, password: string): Promise<User | Error> => {
  try {
    const response = await axiosInstance.patch(`/reset/password`, { identifier: credential, password });
    const { user } = response.data as ResponseData;
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProfileImage = async (profile: string): Promise<User | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/edit/profile/image`, { profile });
    const { user } = response.data as ResponseData;
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const followUser = async (id: string): Promise<User | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/follow/user/${id}`);
    const { user } = response.data as ResponseData;
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const unfollowUser = async (id: string): Promise<User | Error> => {
  try {
    const response = await axiosAuthorized.patch(`/unfollow/user/${id}`);
    const { user } = response.data as ResponseData;
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(saveUser(user as User));
    return Promise.resolve(user as User);
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeUser = async (id: string): Promise<User | Error> => {
   try {
     const response = await axiosAuthorized.patch(`/remove/user/${id}`);
     const { user } = response.data as ResponseData;
     localStorage.setItem("user", JSON.stringify(user));
     store.dispatch(saveUser(user as User));
     return Promise.resolve(user as User);
   } catch (error) {
     return Promise.reject(error);
   }
};




export {
  registerStepOne,
  registerStepTwo,
  updateProfileImage,
  login,
  googleLogin,
  googleSignup,
  getUsers,
  blockUser,
  unBlockUser,
  requestForgotPassword,
  confirmOtpToResetPassword,
  resetPassword,
  followUser,
  unfollowUser,
  removeUser,
};