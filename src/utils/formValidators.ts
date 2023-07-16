const validateUsername = (username:string):boolean => {
  const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{4,12}$/;
  return usernameRegex.test(username);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const handleSignupValidation = (
  username: string,
  email: string,
  password: string
): { field: string; errors: string[] } | null => {
  const trimmedUsername: string = username.trim();
  const trimmedEmail: string = email.trim();
  const trimmedPassword: string = password.trim();

  if (!validateUsername(trimmedUsername)) {
    return {
      field: "username",
      errors: [
        "At least 4-10 characters",
        "One uppercase letter",
        "One lowercase letter",
      ],
    };
  }
  
  if (!validateEmail(trimmedEmail)) {
    return { field: "email", errors: ["Provide a valid email address"] };
  }
  if (!validatePassword(trimmedPassword)) {
    return {
      field: "password",
      errors: [
        "At least 8 characters",
        "One uppercase letter",
        "One uppercase letter",
        "One digit",
        "One special charecter",
      ],
    };
  }
  return null;
};

export const handleLoginValidation = (
  credential: string,
  password: string
): { field: string; errors: string[] } | null => {
  const trimmedCredential: string = credential.trim();
  const trimmedPassword: string = password.trim();

  const isEmailFormat = validateEmail(trimmedCredential);

  if (!isEmailFormat && !validateUsername(trimmedCredential)) {
    return {
      field: "credential",
      errors: ["Provide a valid email address or username"],
    };
  }

  if (!validatePassword(trimmedPassword)) {
    return {
      field: "password",
      errors: [
        "At least 8 characters",
        "One uppercase letter",
        "One uppercase letter",
        "One digit",
        "One special charecter",
      ],
    };
  }

  return null;
};
