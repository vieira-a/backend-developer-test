import { JobStatus } from '../../enums';
import { EntityBase } from '../entity.base';

export class Job extends EntityBase {
  public companyId: string;

  public title: string;

  public description: string;

  public location: string;

  public notes: string;

  public status: string;

  protected constructor() {
    super();
    this.status = JobStatus.DRAFT;
  }
}
