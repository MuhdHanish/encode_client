import { Message } from "./Message";
import { User } from "./User";

export interface Chat {
  _id?: string;
  users?: string[] | User[];
  latestMessage?: string | Message;
}
