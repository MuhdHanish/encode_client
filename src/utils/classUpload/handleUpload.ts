import { AxiosError } from "axios";
import { Course } from "../../dtos/Course";
import { postCourse } from "../../api/courseApi";
import AWS from "aws-sdk";
import { v4 } from "uuid"; 
import { s3Config } from "./s3Config";

const courseNameRegex = /^[\w\s]{10,100}$/;
const shortDescriptionRegex = /^[\w\s.,?!-]{10,250}$/;
const descriptionRegex = /^[\w\s.,?!-]{20,500}$/;

export const handleUpload = async ({
  tutorId,
  category,
  coursename,
  description,
  isPaid,
  level,
  price,
  shortDescription,
}: Course,setErr: (error:string)=> void,selectedVideo:File,selectedImg:File): Promise<boolean | Course|Error> => {
  try {
    if (!courseNameRegex.test(coursename as string)) { setErr("Enter Coursename properly");  return false; }
    if (!shortDescriptionRegex.test(shortDescription as string)) { setErr("Enter Short description propely");  return false; }
    if (!descriptionRegex.test(description as string)) { setErr("Enter Description properly"); return false; }

     const s3 = new AWS.S3({
       accessKeyId: s3Config.accessKeyId,
       secretAccessKey: s3Config.secretAccessKey,
       region: s3Config.region,
     });
     const srcId = v4();
     const videoParams = {
       Body: selectedVideo,
       Bucket: s3Config.bucketName,
       Key: `videos/${srcId}`,
     };

     const demoImgParams = {
       Body: selectedImg,
       Bucket: s3Config.bucketName,
       Key: `thumbnails/${srcId}`,
     };

     try {
       const [videoResponse, demoImgResponse] = await Promise.all([
         s3.upload(videoParams).promise(),
         s3.upload(demoImgParams).promise(),
       ]);

       const videoLocation = `${videoResponse.Key}`;
       const demoImgLocation = `${demoImgResponse.Key}`;

       const course = {
         tutorId,
         category,
         coursename,
         description,
         isPaid,
         level,
         price,
         videoUrl: videoLocation,
         imgUrl: demoImgLocation,
         shortDescription,
       };
       console.log(course)
       const response = await postCourse(course);
       return Promise.resolve(response as Course);
     } catch (error) {
       console.log("Error uploading files:", error);
       throw new Error(error as string);
    }
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
};