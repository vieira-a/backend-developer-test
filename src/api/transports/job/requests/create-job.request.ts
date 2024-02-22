import { CreateJobInput } from '../../../../application/job/inputs/create-job.input';

export class CreateJobRequest extends CreateJobInput {
  public companyId: string;

  public title: string;

  public description: string;

  public location: string;
}
