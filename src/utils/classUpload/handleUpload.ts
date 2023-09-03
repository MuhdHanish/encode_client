import { AxiosError } from "axios";
import { Chapter, Course } from "../../dtos/Course";
import AWS from "aws-sdk";
import { v4 } from "uuid"; 
import { s3Config } from "./s3Config";
import { postFullCourse, upadteCourseDetails } from "../courseUtils";

export const courseNameRegex = /^[\w\s,()?!-=<>/'#+*&^:".]{10,50}$/;
export const descriptionRegex = /^[\w\s.,'()=:<>/+*&^"#?!-]{20,300}$/;


interface S3UploadProgress {
  loaded: number;
  total: number;
}

export const handleUpload = async ({
  tutor,
  language,
  coursename,
  description,
  isPaid,
  level,
  price,
}: Course, setErr: (error: string) => void, selectedDemo: File|string, chapters: Chapter[],onUploadProgress: (progress: number) => void, isPost:boolean, _id?:string): Promise<boolean | Course | Error> => {
  try {
    if (!courseNameRegex.test(coursename as string)) { setErr("Enter Coursename properly"); return false; }
    if (!descriptionRegex.test(description as string)) { setErr("Enter Description properly"); return false; }
    if (chapters.length === 0) { setErr("Add at lease on chapter"); return false; }

      const s3 = new AWS.S3({
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
        region: s3Config.region,
      });
    
    try {
        
      let demoVideoLocation: string;
      if (selectedDemo instanceof File) {
        const srcId = v4();
        const videoParams = {
          Body: selectedDemo,
          Bucket: s3Config.bucketName,
          Key: `videos/${srcId}`,
        };

        const managedUpload = s3.upload(videoParams);
        if (onUploadProgress) {
          managedUpload.on(
            "httpUploadProgress",
            (progress: S3UploadProgress) => {
              const uploadedBytes = progress.loaded;
              const totalBytes = progress.total;
              const uploadPercentage = (uploadedBytes / totalBytes) * 100;
              onUploadProgress(uploadPercentage);
            }
          );
        }

        const [videoResponse] = await Promise.all([
          managedUpload.promise(),
        ]);
        demoVideoLocation = videoResponse.Key;
      } else {
        demoVideoLocation = selectedDemo;
      }

      const chapterArray = await Promise.all(
        chapters.map(async (chapter) => {
          if (chapter.url instanceof File) {
            const chapterSrcId = v4();
            const chapterVideoParams = {
              Body: chapter.url,
              Bucket: s3Config.bucketName,
              Key: `videos/${chapterSrcId}`,
            };
            const managedUpload = s3.upload(chapterVideoParams);
            if (onUploadProgress) {
              managedUpload.on(
                "httpUploadProgress",
                (progress: S3UploadProgress) => {
                  const uploadedBytes = progress.loaded;
                  const totalBytes = progress.total;
                  const uploadPercentage =
                    (uploadedBytes / totalBytes) * 100;
                  onUploadProgress(uploadPercentage);
                }
              );
            }
            const [chapterVideoResponse] = await Promise.all([managedUpload.promise()]);
            return {
              title: chapter.title,
              description: chapter.description,
              url: chapterVideoResponse.Key,
            };
          } else {
            return {
              title: chapter.title,
              description: chapter.description,
              url: chapter.url,
            };
          }
        })
      );

      const course: Course = {
        tutor,
        language,
        coursename,
        description,
        isPaid,
        level,
        price,
        demoUrl: demoVideoLocation,
        chapters: chapterArray,
      };
      if (isPost) {
        const response = await postFullCourse(course);
        return Promise.resolve(response as Course);
      } else {
        const response = await upadteCourseDetails(course,_id as string);
        return Promise.resolve(response as Course);
      }
      } catch (error) {
        console.log("Error uploading files:", error);
        throw new Error(error as string);
      }
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err.response?.data);
  }
}
