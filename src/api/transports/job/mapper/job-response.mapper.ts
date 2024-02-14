import { Injectable } from '@nestjs/common';
import { CreateJobDraftOutput } from 'src/application/job/outputs';

@Injectable()
export class JobResponseMapper {
  async jobDraftResponse(output: CreateJobDraftOutput) {
    return {
      id: output.id,
      title: output.title,
    };
  }
}
