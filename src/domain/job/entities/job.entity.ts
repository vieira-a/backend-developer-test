import { IsNotEmpty, IsUUID } from 'class-validator';

import { Company } from '../../../domain/entities/company';
import { EntityBase } from '../../entities/entity.base';
import { JobStatus } from '../../enums';
import { JobException } from '../exceptions/job.exceptions';

export class JobEntity extends EntityBase {
  @IsUUID(4, { message: JobException.companyIdFormatInvalid })
  @IsNotEmpty({ message: JobException.emptyCompanyId })
  public companyId: string;

  @IsNotEmpty({ message: JobException.emptyTitle })
  public title: string;

  @IsNotEmpty({ message: JobException.emptyDescription })
  public description: string;

  @IsNotEmpty({ message: JobException.emptyLocation })
  public location: string;

  public notes?: string;

  public status?: JobStatus;

  constructor(
    companyId: string,
    title: string,
    description: string,
    location: string,
    notes?: string,
    status?: JobStatus,
  ) {
    super();
    this.companyId = companyId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.notes = notes;
    this.status = status;
  }

  public static create(data: JobEntity, company: Company): JobEntity {
    if (!company.id) {
      return JobException.emptyCompanyId();
    }

    return new JobEntity(
      data.companyId,
      data.title,
      data.description,
      data.location,
      data.notes,
      data.status,
    );
  }

  public static async validateDelete(data: JobEntity) {
    if (!data) {
      return JobException.publicationNotFound();
    }
    return true;
  }

  public static async validateArchive(data: JobEntity): Promise<JobStatus> {
    if (!data) {
      return JobException.publicationNotFound();
    }
    if (data.status !== JobStatus.PUBLISHED) {
      return JobException.invalidPublicationStatus();
    }

    return JobStatus.ARCHIVED;
  }

  public static async validatePublish(data: JobEntity): Promise<JobStatus> {
    if (!data) {
      return JobException.publicationNotFound();
    }

    if (data.status === JobStatus.PUBLISHED) {
      return JobException.publicationAlreadyPublished();
    }

    if (data.status === JobStatus.REJECTED) {
      return JobException.rejectedPublication();
    }
    return JobStatus.PUBLISHED;
  }
}
