import { User } from "../dtos/User";

export const useAuth = (): boolean => {
  const isLoggedIn = localStorage.getItem("user");
  if (isLoggedIn) {
    return true;
  } else {
    return false;
  }
}

export const useUserRole = (): string | null => {
  let role: string | null = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user: User | null = JSON.parse(userData) as User | null;
      if (user) {
        role = user?.role;
        return role;
      }
    }
  } catch (error) {
    console.error("Error retrieving user from localStorage:", error);
  }
  return role;
};


