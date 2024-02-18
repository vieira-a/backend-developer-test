import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from '../../../models';
import { JobDbModel } from '../../job/models';

@Entity('companies')
export class CompanyDbModel extends BaseModel {
  @Column({ name: 'name', nullable: false, unique: true })
  public name: string;

  @OneToMany(() => JobDbModel, (job) => job.companyId)
  public jobs: JobDbModel[];

  protected constructor() {
    super();
  }
}
