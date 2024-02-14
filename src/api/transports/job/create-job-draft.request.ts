import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { CreateJobDraftInput } from '../../../application/job/inputs';

export class CreateJobDraftRequest implements CreateJobDraftInput {
  @IsNotEmpty({ message: 'Empresa obrigatória' })
  @IsUUID(4, { message: 'ID da empresa com formato inválido' })
  public companyId: string;

  @IsNotEmpty({ message: 'Título é obrigatório' })
  public title: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  public description: string;

  @IsNotEmpty({ message: 'Localização é obrigatória' })
  public location: string;

  @IsOptional()
  public notes: string;

  @IsOptional()
  public status: string;

  constructor() {
    this.status = 'draft';
  }
}
