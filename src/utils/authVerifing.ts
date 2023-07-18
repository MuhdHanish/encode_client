import { User } from "../dtos/User";

export const useAuth = (): User|null => {
  const isLoggedIn = localStorage.getItem("user");
  if (isLoggedIn) {
    return JSON.parse(isLoggedIn) as User ;
  } else {
    return null;
  }
}


