import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CreateJobInput } from '../../../../../../application/job/inputs';
import { JobStatus } from '../../../../../../domain/enums';
import { CompanyDbModel } from '../../company/models';

@Entity('jobs')
export class JobDbModel extends CreateJobInput {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ManyToOne(() => CompanyDbModel, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  public companyId: string;

  @Column({ name: 'title', type: 'text', nullable: false })
  public title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  public description: string;

  @Column({ name: 'location', type: 'text', nullable: false })
  public location: string;

  @Column({ name: 'notes', type: 'text' })
  public notes?: string;

  @Column({ name: 'status', nullable: false, default: 'draft' })
  public status?: JobStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public updatedAt?: Date;
}
