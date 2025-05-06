import { Stream } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import { S3, UploadClient } from './s3Upload';

export type S3_ACL = 'public-read' | 'private' | 'public-read-write';

interface UploadParams {
  destination: string;
  filename: string;
  filetype: string;
  acl?: S3_ACL;
  bucketName?: string;
}

export interface UploadParamsStream extends UploadParams {
  file: Stream;
}

export interface UploadParamsBuffer extends UploadParams {
  file: Buffer;
}

export class FileUpload extends UploadClient {
  constructor(client: S3, BUCKET_NAME: string, S3_URL: string) {
    super(client, BUCKET_NAME, S3_URL);
  }
  fileExtension = (filename: string) => {
    const r = filename.split('.');
    return r[r.length - 1];
  };

  // Upload stream coming for apollo upload for example
  uploadStream = async (input: UploadParamsStream) => {
    const { file, destination, filename, filetype, acl, bucketName } = input;
    try {
      const buffer = await this.stream2buffer(file);
      const key = `${destination}${uuidv4()}.${filename.split('.')[1]}`;
      const params = {
        Bucket: bucketName || this.BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: filetype,
        ACL: acl || 'public-read',
      };
      const url = await this.uploadObject(params);
      // actual s3 upload
      const result = {
        url,
        key,
      };
      return result;
    } catch (error) {
      return error;
    }
  };

  uploadBuffer = async (input: UploadParamsBuffer) => {
    const { file, destination, filename, filetype, acl, bucketName } = input;
    const key = `${destination}${uuidv4()}.${filename.split('.')[1]}`;
    const params = {
      Bucket: bucketName || this.BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: filetype,
      ACL: acl || 'public-read',
    };
    const url = await this.uploadObject(params);
    // actual s3 upload
    const result = {
      url,
      destination,
    };
    return result;
  };
}
