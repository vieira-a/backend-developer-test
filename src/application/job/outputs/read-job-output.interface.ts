import { JobEntity } from '../../../domain/job/entities';

export class ReadJobOutput extends JobEntity {
  public id?: string;

  public title: string;

  public description: string;

  public location: string;
}
