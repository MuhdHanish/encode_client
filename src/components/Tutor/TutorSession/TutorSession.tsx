import React, {  useState } from "react";
import { FormValues } from "../../../dtos/Form";
import HandleForm from "../../../utils/handleFormState";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { User } from "../../../dtos/User";
import { toast } from "react-toastify";
import { handleUpload } from "../../../utils/classUpload/handleUpload";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import SideNav from "./SessionComponents/SideNav/SideNav";
import { CategorySelection, DescriptionInput, IsPaidSelection, LevelSelection, PriceInput, TitleInput } from "./SessionComponents/FormComponents";
import VideoInput from "./SessionComponents/FormComponents/VideoInput";


const TutorSession: React.FC = () => {
  const [sessionState, setSessionState, clearForm] = HandleForm({
    coursename: "",
    category: "",
    level: "",
    isPaid: "",
    price: "0",
    description: "",
  } as FormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVideos, setSelectedVideos] = useState<{ file: File; id: number }[]>([]);
  const setVideo = (file: File, id: number) => {
  setSelectedVideos([...selectedVideos, { file, id }]);
  };
  const removeVideo = (id: number) => {setSelectedVideos(selectedVideos.filter((videoFile) => videoFile.id !== id));}
  const [error, setError] = useState<string>("");
  const setErr = (error: string) => setError(error);
  const user: User | null = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const userId = user?._id;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (
      !sessionState.coursename ||
      !sessionState.category ||
      !sessionState.isPaid ||
      !sessionState.description ||
      !sessionState.price||
      !sessionState.level ||
      !selectedVideos.length
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
        tutorId: userId as string,
        category: sessionState.category,
        coursename: sessionState.coursename,
        description: sessionState.description,
        isPaid: isPaid,
        level: sessionState.level,
        price: price,
      },
      setErr,
      selectedVideos
    )
      .then((res) => {
        setLoading(false);
        setSelectedVideos([]);
        if (res) {
          clearForm();
          toast.success("Course uploaded successfully!", {
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
        <div className="hidden lg:flex">
          <SideNav />
        </div>
        <div className="w-full  h-full p-5 overflow-hidden">
          <div className="w-full  h-full border rounded-lg  sm:items-start flex shadow-lg overflow-scroll">
            <div className="flex w-1/2 h-full  flex-col">
              <TitleInput sessionState={sessionState} setSessionState={setSessionState} />
              <DescriptionInput sessionState={sessionState} setSessionState={setSessionState} />
              <VideoInput setVideo={setVideo} selectedVideos={selectedVideos} removeVideo={removeVideo} />
            </div>
            <div className="flex w-1/2 h-full  flex-col">
              <div className="w-full h-fit  flex ">
              <CategorySelection sessionState={sessionState} setSessionState={setSessionState} />
              <LevelSelection  sessionState={sessionState} setSessionState={setSessionState} />
              </div>
              <div className="w-full h-fit  flex ">
              <IsPaidSelection sessionState={sessionState} setSessionState={setSessionState} />
              <PriceInput  sessionState={sessionState} setSessionState={setSessionState} />
              </div>
              <div className="w-full h-fit  flex pl-1">
                <div className="flex flex-col w-full justify-center items-center h-fit p-3">
                  <div className="felx flex-col  items-center justify-center">
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
