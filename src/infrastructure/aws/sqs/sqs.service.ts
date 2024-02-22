import 'dotenv/config';

import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsService {
  private readonly sqs: SQSClient;
  private readonly queueUrl: string;

  constructor() {
    (this.sqs = new SQSClient({ region: process.env.AWS_REGION })),
      (this.queueUrl = process.env.AWS_SQS_URL);
  }

  async send(body: any): Promise<void> {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(body),
    };

    const command = new SendMessageCommand(params);

    try {
      await this.sqs.send(command);
    } catch (error) {
      console.log('Erro ao enviar mensagem para SQS', error);
      throw error;
    }
  }
}
