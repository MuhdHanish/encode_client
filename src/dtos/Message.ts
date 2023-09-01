import { Chat } from "./Chat";
import { User } from "./User";

export interface Message {
  _id?: string;
  sender?: string | User;
  content?: string;
  chat?: string | Chat;
  createdAt?: Date;
  updatedAt?: Date;
}
