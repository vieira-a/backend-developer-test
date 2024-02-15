import { Injectable } from '@nestjs/common';

@Injectable()
export class JobResponseMapper {
  async jobDraftResponse(output: CreateJobDraftOutput) {
    return {
      id: output.id,
      title: output.title,
    };
  }
}
