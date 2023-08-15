import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Navigate } from "react-router-dom";

interface CourseProtectedProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

export const CourseProtectedCaseOne: React.FC<CourseProtectedProps> = ({
  element
}) => {
  const { user, selectedCourse } = useSelector((state: RootState) => state.userReducer);
  if (selectedCourse?.students?.includes(user?._id as string)) {
    return <Navigate to={`/selected/course/${selectedCourse?._id as string}`} replace/>
  }
  return <>{element}</>;
};

export const CourseProtectedCaseTwo: React.FC<CourseProtectedProps> = ({
  element
}) => {
  const { user, selectedCourse } = useSelector((state: RootState) => state.userReducer);
  if (!selectedCourse?.students?.includes(user?._id as string)) {
   return <Navigate to={`/course/${selectedCourse?._id as string}`} replace/>
  }
  return <>{element}</>;
};

