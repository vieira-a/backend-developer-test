import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateJobOutput } from '../../../application/job/outputs';
import { Company } from '../../../domain/entities/company';
import { EntityBase } from '../../entities/entity.base';
import { JobStatus } from '../../enums';

export class JobEntity extends EntityBase {
  @IsNotEmpty({ message: 'Por favor, informe o ID empresa' })
  @IsUUID(4, { message: 'O ID da empresa não está no formato inválido' })
  public companyId: string;

  @IsNotEmpty({ message: 'Por favor, informe um título para a publicação' })
  public title: string;

  @IsNotEmpty({ message: 'Por favor, informe uma descrição para a publicação' })
  public description: string;

  @IsNotEmpty({ message: 'Por favor, informe a localização' })
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
    if (!company) {
      throw new BadRequestException('O ID da empresa está incorreto');
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

  public archive(): CreateJobOutput {
    if (this.status !== JobStatus.PUBLISHED) {
      return {
        error: new BadRequestException(
          'Apenas postagens publicadas podem ser arquivadas',
        ),
      };
    }
    this.status = JobStatus.ARCHIVED;
    return {
      message: 'Publicação arquivada com sucesso',
    };
  }

  public publish(): CreateJobOutput {
    this.status = JobStatus.PUBLISHED;
    return {
      message: 'Postagem publicada com sucesso',
    };
  }

  public static async validateDelete(data: JobEntity) {
    if (!data) {
      throw new NotFoundException('A publicação não foi localizada');
    }
    return;
  }
}
