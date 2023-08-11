import { User } from "../dtos/User";
import { blockUser, getUsers, unBlockUser } from "../api/userAuthApi";
import { apiError } from "../api/ApiInterface";

export const getFullUsers = async (): Promise<User[] | null> => {
  try {
    const users = (await getUsers()) as User[];
    return users;
  } catch (error) {
    const err = error as apiError;
    return Promise.reject(err.message);
  }
}
export const blockTheUser = async (userId: string): Promise<User | null> => {
  try {
    const user = (await blockUser(userId)) as User;
    return user;
  } catch (error) {
  
   const err = error as apiError;
   return Promise.reject(err.message);
  }
}

export const unBlockTheUser = async (userId: string): Promise<User | null> => {
  try {
    const user = (await unBlockUser(userId)) as User;
    return user;
  } catch (error) {
   const err = error as apiError;
   return Promise.reject(err.message);
  }
}
