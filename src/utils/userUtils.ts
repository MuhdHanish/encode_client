import { User } from "../dtos/User";
import { blockUser, followUser, getUsers, unBlockUser, unfollowUser, updateProfileImage } from "../api/userAuthApi";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import { s3Config } from "./classUpload/s3Config";


const s3 = new AWS.S3({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
  region: s3Config.region,
});

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

export const changeProfile = async (file: File): Promise<User|Error> => {
  try {
      const srcId = v4();
      const profileParam = {
        Body: file,
        Bucket: s3Config.bucketName,
        Key: `profiles/${srcId}`,
      };
      const [profileResponse] = await Promise.all([s3.upload(profileParam).promise(),]);
      const profileLocation = `${import.meta.env.VITE_BUCKET_BASE_URL as string}/${profileResponse.Key}`;
      const user = await updateProfileImage(profileLocation);
      return Promise.resolve(user as User);
    } catch (error) {
      return Promise.reject(error);
    }
}

export const follow = async(id:string): Promise<User|Error> => {
  try {
      const user = await followUser(id);
      return Promise.resolve(user as User);
    } catch (error) {
      return Promise.reject(error);
    }
}
export const unfollow = async(id:string): Promise<User|Error> => {
  try {
    const user = await unfollowUser(id);
     return Promise.resolve(user as User); 
    } catch (error) {
      return Promise.reject(error);
    }
}
