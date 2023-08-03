import React, {  useState } from "react";
import { FormValues } from "../../../../dtos/Form";
import HandleForm from "../../../../utils/handleFormState";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { User } from "../../../../dtos/User";
import { toast } from "react-toastify";
import { handleUpload } from "../../../../utils/classUpload/handleUpload";
import LoadingSpinner from "../../../Common/LoadingSpinner/LoadingSpinner";
import {
  LanguageSelection,
  DescriptionInput,
  IsPaidSelection,
  VideoInput,
  LevelSelection,
  PriceInput,
  TitleInput,
} from "../SessionComponents/FormComponents";


const TutorSession: React.FC = () => {
  const [sessionState, setSessionState, clearForm] = HandleForm({
    coursename: "",
    language: "",
    level: "",
    isPaid: "",
    price: "0",
    description: "",
  } as FormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOverview, setSelectedOverview] = useState<File|null>(null);
  const setVideo = (file: File) => { setSelectedOverview(file);};
  const [error, setError] = useState<string>("");
  const setErr = (error: string) => setError(error);
  const user: User | null = useSelector((state: RootState) => state.userReducer.user);
  const userId = user?._id;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (
      !sessionState.coursename ||
      !sessionState.language ||
      !sessionState.isPaid ||
      !sessionState.description ||
      !sessionState.price||
      !sessionState.level ||
      !selectedOverview
    ) {
      setLoading(false);
      setError("Please fill all required fields");
      return;
    }
    setError("");
    let isPaid = false;
    if (sessionState.isPaid === "yes") {
      isPaid = true;
    }
    let price = 0;
    if (
      sessionState.price !== "" &&
      !isNaN(parseInt(sessionState.price)) &&
      parseInt(sessionState.price) > 0 &&
      sessionState.isPaid === "yes"
    ) {
      price = parseInt(sessionState.price);
    }
    handleUpload(
      {
        tutor: userId as string,
        language: sessionState.language,
        coursename: sessionState.coursename,
        description: sessionState.description,
        isPaid: isPaid,
        level: sessionState.level,
        price: price,
      },
      setErr,
      selectedOverview
    )
      .then((res) => {
        setLoading(false);
        setSelectedOverview(null);
        if (res) {
          clearForm();
          toast.success("Course registered successfully!, add tutorials", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
        }
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative "
      >
        <div className="w-full  h-full p-5 overflow-hidden">
          <div className="w-full  h-full border rounded-lg  sm:items-start flex shadow-lg overflow-scroll">
            <div className="flex w-1/2 h-full  flex-col">
              <TitleInput sessionState={sessionState} setSessionState={setSessionState}
              />
              <DescriptionInput sessionState={sessionState} setSessionState={setSessionState}
              />
              <VideoInput setVideo={setVideo} selectedVideo={selectedOverview} 
              />
            </div>
            <div className="flex w-1/2 h-full  flex-col">
              <div className="w-full h-fit  flex flex-col">
                <LanguageSelection sessionState={sessionState} setSessionState={setSessionState}
                />
                <LevelSelection sessionState={sessionState} setSessionState={setSessionState}
                />
              </div>
              <div className="w-full h-fit  flex">
                <IsPaidSelection sessionState={sessionState} setSessionState={setSessionState}
                />
                <PriceInput sessionState={sessionState} setSessionState={setSessionState}
                />
              </div>
              <div className="w-full h-fit  flex pl-1">
                <div className="flex flex-col w-full justify-center items-center h-fit p-3">
                  <div className="felx flex-col w-full items-center justify-center mt-3">
                    {error && (
                      <div className="text-red-600 w-full text-sm font-semibold mb-2">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn-class border w-full   text-[14px] p-2  mb-5  rounded-md outline-none shadow-md"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner /> <span>Please wait</span>
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TutorSession;
