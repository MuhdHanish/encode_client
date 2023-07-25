import React, { useState } from "react";
import { FormValues } from "../../../dtos/Form";
import HandleForm from "../../../utils/handleFormState";
import CommonField from "./SessionComponents/CommonField/CommonField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { User } from "../../../dtos/User";
import { toast } from "react-toastify";
import { handleUpload } from "../../../utils/classUpload/handleUpload";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";

const TutorSession: React.FC = () => {
  const [sessionState, setSessionState] = HandleForm({
    coursename: "", shortDescription: "", category: "",
    level: "", isPaid: "", price: "0", description: "",
  } as FormValues );
  const [loading, setLoading] = useState<boolean>(false);
  const [seletedImg, setSelectedImg] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleImgInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setSelectedImg(selectedFile || null);
  };
  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setSelectedVideo(selectedFile || null);
  };
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
      !sessionState.level ||
      !sessionState.shortDescription ||
      !selectedVideo ||
      !seletedImg
    ) {
      setLoading(false);
      setError("Please fill all required fields");
      return;
    }
    setError("");
    let price = 0;
    if (
      sessionState.price !== "" &&
      !isNaN(parseInt(sessionState.price as string)) &&
      parseInt(sessionState.price as string) > 0 &&
      sessionState.isPaid === "yes"
    ) {
      price = parseInt(sessionState.price as string);
    }
    let isPaid = false;
    if (sessionState.isPaid === "yes") {
      isPaid = true;
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
        shortDescription: sessionState.shortDescription,
      },
      setErr,
      selectedVideo,
      seletedImg
    )
      .then(() => {
        setSelectedImg(null);
        setSelectedVideo(null);
        toast.success("Course uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div
          className={`bg-white  w-full h-full rounded-md 
        flex justify-center shadow-xl  flex-row}`}
        >
          <div className="w-full h-full"></div>
          {/* <form onSubmit={handleSubmit}>
            <div className="flex-col flex  sm:flex-row gap-2 md:gap-5 my-5">
              <div className="flex-col ">
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="coursename"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"text"}
                    showName={"Course name"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="category"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"select"}
                    showName={"Category"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="isPaid"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"selectIsPaid"}
                    showName={"Is Paid or Not"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="description"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"textarea"}
                    showName={"Description"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2 items-center">
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="Demo img"
                      className="text-[11px] text-shadow-black"
                    >
                      Video
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className="border text-xs p-2 text-[10px]  w-[164px] sm:w-[250px] rounded-md outline-none shadow-md"
                      accept=".mp4, .avi, .mov, .mkv, .webm"
                      onChange={handleVideoInput}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="shortDescription"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"text"}
                    showName={"Short Description"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="level"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"selectLevel"}
                    showName={"Level"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2  items-center">
                  <CommonField
                    fieldName="price"
                    passedState={sessionState}
                    setPassedState={setSessionState}
                    type={"price"}
                    showName={"Price"}
                  />
                </div>
                <div className="w-full  flex flex-col justify-center gap-2 mt-3 items-center">
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="Demo img"
                      className="text-[11px] text-shadow-black"
                    >
                      Demo Img<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className="border text-xs p-2 text-[10px]  w-[164px] sm:w-[250px] rounded-md outline-none shadow-md"
                      accept=".jpg, .jpeg, .png, .gif, .pdf"
                      onChange={handleImgInput}
                    />
                  </div>
                </div>
                {error && (
                  <div className="w-full  text-red-600 text-[11px] font-semibold flex flex-col justify-center my-1 items-center ">
                    {error}
                  </div>
                )}
                <button className="btn-class flex justify-center items-center gap-2 ">
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
          </form> */}
        </div>
      </div>
    </>
  );
};

export default TutorSession;
