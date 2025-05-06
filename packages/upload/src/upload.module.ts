import { S3ClientConfig } from '@aws-sdk/client-s3';
import { DynamicModule, Module } from '@nestjs/common';

import { IUploadConfig } from './types';
import { UploadService } from './upload.service';
import { createS3Provider } from './utils';

@Module({})
export class UploadModule {
  static register(options: {
    config: S3ClientConfig;
    uploadConfig: IUploadConfig;
  }): DynamicModule {
    return {
      module: UploadModule,
      providers: [UploadService, createS3Provider(options)],
      exports: [UploadService],
    };
  }
}
