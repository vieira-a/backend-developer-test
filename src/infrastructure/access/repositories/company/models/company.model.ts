import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from '../../../models';
import { JobModel } from '../../job/models';

@Entity('companies')
export class CompanyModel extends BaseModel {
  @Column({ name: 'name', nullable: false, unique: true })
  public name: string;

  @OneToMany(() => JobModel, (job) => job.companyId)
  public jobs: JobModel[];

  protected constructor() {
    super();
  }
}
