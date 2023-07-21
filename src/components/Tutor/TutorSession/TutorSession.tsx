import React from 'react'
import { FormValues } from '../../../dtos/Form';
import HandleForm from '../../../utils/handleFormState';
import PageModal from '../../Common/PageModal/PageModal';
import CommonField from './SessionComponents/CommonField/CommonField';

const TutorSession: React.FC = () => {
  const [sessionState, setSessionState] = HandleForm({
    coursename: "", shortDescription: "", category: "",
    isPaid: false, price: 0, sylabus: [{ session: "", descritption: "" }],description: "",
    imgUrl: "", videoUrl: "", assignments: [{ question: "", rightAns: "", options: [] }]
  } as FormValues);
  return (
    <PageModal>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center p-3 md:p-8  gap-1">
          <div className="w-full  flex flex-col justify-center gap-2  items-center">
            <CommonField fieldName='coursename' passedState={sessionState} setPassedState={setSessionState} type={"text"} showName={"Course name"} />
          </div>
          <div className="w-full  flex flex-col justify-center gap-2  items-center">
            <CommonField fieldName='category' passedState={sessionState} setPassedState={setSessionState} type={"select"} showName={"Category"}  />
          </div>
          <div className="w-full  flex flex-col justify-center gap-2  items-center">
            <CommonField fieldName='coursename' passedState={sessionState} setPassedState={setSessionState} type={"text"} showName={"Course name"}  />
          </div>
        </div>
        <div className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center p-3 md:p-8  gap-1">
          <div className="w-full  flex flex-col justify-center gap-2  items-center">
            <CommonField fieldName='shortDescription' passedState={sessionState} setPassedState={setSessionState} type={"text"} showName={"Short Description"}  />
          </div>
          <div className="w-full  flex flex-col justify-center gap-2  items-center">
            <CommonField fieldName='description' passedState={sessionState} setPassedState={setSessionState} type={"textarea"} showName={"Description"}  />
          </div>
        </div>
      </div>
    </PageModal>
  );
}

export default TutorSession