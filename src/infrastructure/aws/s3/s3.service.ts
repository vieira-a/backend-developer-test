import 'dotenv/config';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client();
  }

  async getFileFromS3(): Promise<string> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: process.env.AWS_BUCKET_KEY,
    };

    const command = new GetObjectCommand(params);
    const response = await this.s3Client.send(command);

    const jobs = await JSON.parse(
      await this.streamToString(response.Body as Readable),
    );
    return jobs;
  }

  private async streamToString(stream: Readable): Promise<string> {
    const chunks: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      stream.on('error', (error) => reject(error));
    });
  }
}
