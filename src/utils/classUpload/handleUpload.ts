import { AxiosError } from "axios";
import { Course } from "../../dtos/Course";
import { postCourse } from "../../api/courseApi";
import AWS from "aws-sdk";
import { v4 } from "uuid"; 
import { s3Config } from "./s3Config";

const courseNameRegex = /^[\w\s]{10,100}$/;
const descriptionRegex = /^[\w\s.,'?!-]{20,500}$/;

export const handleUpload = async ({
  tutor,
  language,
  coursename,
  description,
  isPaid,
  level,
  price,
}: Course, setErr: (error: string) => void, selectedVideo: File): Promise<boolean | Course | Error> => {
  try {
    if (!courseNameRegex.test(coursename as string)) { setErr("Enter Coursename properly"); return false; }
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


      try {
        const [videoResponse] = await Promise.all([
          s3.upload(videoParams).promise(),
        ]);

        const videoLocation = `${videoResponse.Key}`;

        const course = {
          tutor,
          language,
          coursename,
          description,
          isPaid,
          level,
          price,
          overview: videoLocation,
        };

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
}
