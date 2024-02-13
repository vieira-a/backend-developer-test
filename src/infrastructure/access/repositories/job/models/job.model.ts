import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CreateJobDraftInput } from '../../../../../application/job/inputs';
import { CompanyModel } from '../../company/models';

@Entity('jobs')
export class JobModel extends CreateJobDraftInput {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @OneToMany(() => CompanyModel, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  public companyId: string;

  @Column({ name: 'title', type: 'text', nullable: false })
  public title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({ name: 'location', type: 'text', nullable: false })
  public location: string;

  @Column({ name: 'title', type: 'text' })
  public notes: string;

  @Column({ name: 'status', nullable: false, default: 'draft' })
  public status: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public updatedAt: Date;
}
