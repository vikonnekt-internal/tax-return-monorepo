import { S3ClientConfig } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';

import { PROVIDER_NAME } from './constants';
import {
  FileUpload,
  UploadParamsBuffer,
  UploadParamsStream,
} from './FileUpload';
import { IUploadConfig } from './types';
import { createUploadInstance } from './utils';

@Injectable()
export class UploadService {
  uploadInstance: FileUpload;
  constructor(
    @Inject(PROVIDER_NAME)
    s3Config: {
      config: S3ClientConfig;
      uploadConfig: IUploadConfig;
    },
  ) {
    this.uploadInstance = createUploadInstance(
      s3Config.config,
      s3Config.uploadConfig,
    );
  }
  uploadStream(params: UploadParamsStream) {
    return this.uploadInstance.uploadStream(params);
  }
  uploadBuffer(params: UploadParamsBuffer) {
    return this.uploadInstance.uploadBuffer(params);
  }
  getSignedUrl(key: string, expiresIn: number) {
    return this.uploadInstance.getSignedUrl(key, expiresIn);
  }

  remove(key: string) {
    return this.uploadInstance.removeObject(key);
  }
}
