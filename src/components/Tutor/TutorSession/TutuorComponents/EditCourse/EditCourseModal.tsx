import React, { useState } from 'react'
import { Chapter } from '../../../../../dtos/Course';
import AddChapter from '../AddComponents/AddChapter';
import AddCourse from '../AddComponents/AddCourse';
import HandleForm from '../../../../../utils/handleFormState';
import { FormValues } from '../../../../../dtos/Form';
import { courseNameRegex, descriptionRegex, handleUpload } from '../../../../../utils/classUpload/handleUpload';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { User } from '../../../../../dtos/User';
import { toast } from 'react-toastify';
import { BsArrowLeftShort } from 'react-icons/bs';

interface ModalProps {
  setIsOpen: (value:boolean) => void
}

const EditCourseModal: React.FC<ModalProps> = ({ setIsOpen }) => {
   const selectedCourse = useSelector((state:RootState)=>state.userReducer.selectedCourse)
   const [sessionState, setSessionState, clearForm] = HandleForm({
     coursename: selectedCourse?.coursename,
     language: selectedCourse?.language,
     level: selectedCourse?.level,
     isPaid: selectedCourse?.isPaid ? "yes" : "no",
     price: selectedCourse?.price,
     description: selectedCourse?.description,
   } as FormValues);

   const [chapterState, setChapterState, clearChapterState] = HandleForm({
     chapterTitle: "",
     chapterDescription: "",
   } as FormValues);

   const [loading, setLoading] = useState<boolean>(false);
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   const onUploadProgress = (progress: number) => {
     setUploadProgress(progress);
   };
   const [selectedDemo, setSelectedDemo] = useState<File | null|string>(selectedCourse?.demoUrl as string);
   const setVideo = (file: File) => {
     setSelectedDemo(file);
   };

   const [chapters, setChapters] = useState<Chapter[] | []>(selectedCourse?.chapters as Chapter[]);
   const [chapterVideo, setChapterVideo] = useState<File | null>(null);
   const setChVideo = (file: File) => {
     setChapterVideo(file);
   };

   const [error, setError] = useState<string>("");
   const setErr = (error: string) => setError(error);

   const addChapter = () => {
     if (
       !chapterVideo ||
       !chapterState.chapterDescription ||
       !chapterState.chapterTitle
     ) {
       setErr("Fill creadential to set chapters");
       return;
     }
     if (!courseNameRegex.test(chapterState.chapterTitle.trim())) {
       setErr("Enter Coursename properly");
       return;
     }
     if (!descriptionRegex.test(chapterState.chapterDescription.trim())) {
       setErr("Enter Description properly");
       return;
     }
     setChapters([
       ...chapters,
       {
         title: chapterState.chapterTitle,
         description: chapterState.chapterDescription,
         url: chapterVideo,
       },
     ]);
     setErr(" ");
     clearChapterState();
     setChapterVideo(null);
     return;
   };

   const removeChapter = (index: number) => {
     setChapters((prevChapters) =>
       prevChapters.filter((_, idx) => idx !== index)
     );
   };

   const user: User | null = useSelector(
     (state: RootState) => state.userReducer.user
   );
   const userId = user?._id;
   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
     setLoading(true);
     event.preventDefault();
     if (
       !sessionState.coursename ||
       !sessionState.language ||
       !sessionState.isPaid ||
       !sessionState.description ||
       !sessionState.price ||
       !sessionState.level ||
       !selectedDemo
     ) {
       setLoading(false);
       setError("Please fill all required fields");
       return;
     } else if (chapters.length === 0) {
       setLoading(false);
       setError("Add at leaset one chapter");
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
     const isPost = false;
     const _id = selectedCourse?._id;
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
       selectedDemo,
       chapters,
       onUploadProgress,
       isPost, _id
     )
       .then((res) => {
         setLoading(false);
         if (res) {
           clearForm();
           clearChapterState();
           toast.success("Course update successfully!", {
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
         setLoading(false);
         console.log(error);
       });
   };
  return (
    <>
      <div className="flex w-full flex-col justify-center items-center h-full bg-white absolute px-5 py-1 gap-2 ">
        <div className="flex w-full h-fit border-green justify-end ">
          <button
            onClick={() => setIsOpen(false)}
            className=" flex  gap-2 items-center text-[13px]"
          >
            <BsArrowLeftShort style={{ fontSize: "25px" }} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative "
        >
          <div className="w-full  h-full  overflow-hidden">
            <div className="w-full  h-full border  sm:items-start flex shadow-lg overflow-scroll">
              <AddCourse
                selectedVideo={selectedDemo}
                sessionState={sessionState}
                setSessionState={setSessionState}
                setVideo={setVideo}
              />
              <div className="flex w-1/2 h-full  flex-col">
                <>
                  <AddChapter
                    chapterState={chapterState}
                    setChapterState={setChapterState}
                    setChVideo={setChVideo}
                    chapterVideo={chapterVideo}
                    chapters={chapters}
                    removeChapter={removeChapter}
                  />
                </>
                <div className="flex gap-3 w-full h-fit justify-end items-center text-[14px] px-5 ">
                  <div className="bg-[#C5C5C5] w-fit h-fit rounded-md">
                    <button
                      className="flex gap-3 border px-4 py-1 translate-x-1 -translate-y-1 active:translate-x-0 active:-translate-y-0 shadow-2xl border-slate-200 bg-white rounded-md   transition duration-150 "
                      type="button"
                      onClick={() => addChapter()}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="w-full h-fit  flex pl-1">
                  <div className="flex flex-col w-full justify-center items-center h-fit p-3">
                    <div className="felx flex-col w-full items-center justify-center mt-3">
                      {error && (
                        <div className="text-red-600 w-full text-sm font-semibold mb-2">
                          {error}
                        </div>
                      )}
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="flex justify-center items-center flex-col gap-1">
                          <p>{`Uploading... ${uploadProgress.toFixed(2)}%`}</p>
                          <div className="loaderBar"></div>
                        </div>
                      )}
                      <button
                        type="submit"
                        className="btn-class border w-full   text-[14px] p-2  mb-5  rounded-md outline-none shadow-md"
                      >
                        {loading ? (
                          <>
                            <span>Please wait</span>
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
      </div>
    </>
  );
}

export default EditCourseModal