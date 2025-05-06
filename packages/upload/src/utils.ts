import { S3, S3ClientConfig } from "@aws-sdk/client-s3";

import { PROVIDER_NAME } from "./constants";
import { FileUpload as Uploader } from "./FileUpload";
import { IUploadConfig } from "./types";

let s3Instance: S3 | null = null;

const uploadInstances: Record<string, Uploader> = {};

export function createUploadInstance(
  config: S3ClientConfig,
  uploadConfig: IUploadConfig
) {
  if (uploadInstances[uploadConfig.BUCKET_NAME])
    return uploadInstances[uploadConfig.BUCKET_NAME];

  if (!s3Instance) s3Instance = new S3(config);

  const uploadInstance = new Uploader(
    s3Instance,
    uploadConfig.BUCKET_NAME,
    uploadConfig.S3_URL
  );
  uploadInstances[uploadConfig.BUCKET_NAME] = uploadInstance;
  return uploadInstance;
}

export function createS3Provider(config: {
  config: S3ClientConfig;
  uploadConfig: IUploadConfig;
}) {
  return {
    provide: PROVIDER_NAME,
    useValue: config,
  };
}
