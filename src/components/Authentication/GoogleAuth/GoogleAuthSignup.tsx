import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { handleGoogleSignup } from "../../../utils/Authentication/handleGoogleSignup";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";


interface GoogleAuthProps {
  role: string;
  setResError: (value: string) => void;
}

const GoogleAuthSingup: React.FC<GoogleAuthProps> = ({ role, setResError }) => {
  const navigate = useNavigate();
  const googleSignup = (credentialResponse: GoogleCredentialResponse) => {
    handleGoogleSignup(credentialResponse, role)
      .then((res) => {
        if (res) {
          if(role==="student"){navigate(`/`, { replace: true });}
          else {navigate(`/${role}`, { replace: true });}
        }
      })
      .catch((err: apiError) => {
        setResError(err.message);
      });
  };

  return (
    <>
      <div className="flex justify-center border items-center gap-5 rounded-md p-1 w-full shadow-md transition duration-500 hover:scale-105 cursor-pointer ">
        <GoogleLogin
          size="medium"
          text="continue_with"
          onSuccess={(credentialResponse) => googleSignup(credentialResponse)}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </>
  );
};

export default GoogleAuthSingup;
