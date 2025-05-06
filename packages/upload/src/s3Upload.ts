import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { StreamUtils } from './streamUtils';

class UploadClient extends StreamUtils {
  s3Client: S3;
  BUCKET_NAME: string;
  S3_URL: string;
  constructor(client: S3, BUCKET_NAME: string, S3_URL: string) {
    super();
    this.s3Client = client;
    this.BUCKET_NAME = BUCKET_NAME;
    this.S3_URL = S3_URL;
  }

  async sendCommend(command: PutObjectCommand | DeleteObjectCommand) {
    try {
      const response = await this.s3Client.send(command);
      return response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
  uploadObject = async (params: PutObjectCommandInput) => {
    const command = new PutObjectCommand(params);
    return this.sendCommend(command);
  };

  removeObject = async (key: string) => {
    if (!key) {
      // eslint-disable-next-line no-console
      return console.error('No key !');
    }
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(params);
    return this.sendCommend(command);
  };

  async getSignedUrl(key: string, expiresIn: number) {
    const command = new GetObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: key,
    });
    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  convertKeyToS3Url = (field: string) => {
    return `${field.startsWith('http') ? '' : this.S3_URL}/${field}`;
  };

  removeS3Url = (url: string): string => {
    return url.split(this.S3_URL)[1];
  };
}

export { S3, UploadClient };
