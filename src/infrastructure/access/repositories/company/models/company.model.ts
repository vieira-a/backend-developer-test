import { Column, Entity } from 'typeorm';

import { BaseModel } from '../../../models';

@Entity('companies')
export class CompanyModel extends BaseModel {
  @Column({ name: 'name', nullable: false, unique: true })
  public name: string;

  protected constructor() {
    super();
  }
}
