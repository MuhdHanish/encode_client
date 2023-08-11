import { User } from "../dtos/User";
import { blockUser, getUsers, unBlockUser } from "../api/userAuthApi";

export const getFullUsers = async (): Promise<User[] | null> => {
  try {
    const users = (await getUsers()) as User[];
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
}
export const blockTheUser = async (userId: string): Promise<User | null> => {
  try {
    const user = (await blockUser(userId)) as User;
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const unBlockTheUser = async (userId: string): Promise<User | null> => {
  try {
    const user = (await unBlockUser(userId)) as User;
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}
