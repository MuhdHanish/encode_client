import AWS from "aws-sdk";

export const s3Config = {
  bucketName: import.meta.env.VITE_BUCKET_NAME as string,
  region: import.meta.env.VITE_REGION_NAME as string,
  accessKeyId: import.meta.env.VITE_BUCKET_ACCESS_KEY as string,
  secretAccessKey: import.meta.env.VITE_BUCKET_SECRET_KEY as string,
};

const S3_BUCKET = s3Config.bucketName;
const REGION = s3Config.region;

AWS.config.update({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
});

export const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const s3URL = `https://s3.amazonaws.com/${S3_BUCKET}`;
