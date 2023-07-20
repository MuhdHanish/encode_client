import { AxiosError } from "axios";
import { User } from "../../../dtos/User";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { handleGoogleLogin } from "../../../utils/Authentication/handleGoogleLogin";

interface GoogleAuthProps {
  role?: string;
  setResError: (value: string) => void;
}

const GoogleAuthLogin: React.FC<GoogleAuthProps> = ({ setResError }) => {
  const navigate = useNavigate();
  const googleLogin = (credentialResponse: GoogleCredentialResponse) => {
    try {
      handleGoogleLogin(credentialResponse)
        .then((res: User | boolean | AxiosError<unknown>) => {
          if (res && typeof res !== "boolean") {
            const user = res as User;
            navigate(`/${user.role}`, { replace: true });
          }
        })
        .catch((err: apiError) => setResError(err.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center border items-center gap-5 rounded-md p-1 w-full shadow-md transition duration-500 hover:scale-105 cursor-pointer ">
        <GoogleLogin
          size="small"
          text="signin_with"
          onSuccess={(credentialResponse) => googleLogin(credentialResponse)}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </>
  );
};

export default GoogleAuthLogin