import { Job } from '../../../domain/entities/job';

export class ReadDraftByIdOutput extends Job {
  public id?: string;

  public title: string;

  public description: string;

  public location: string;
}
