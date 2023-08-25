export interface SmallUser {
  _id: string;
  username: string;
  email: string;
  profile: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profile: string;
  role: string;
  status: boolean
  following: SmallUser[] 
  followers: SmallUser[] 
}