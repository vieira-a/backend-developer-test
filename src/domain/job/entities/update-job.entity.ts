import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IsOptional } from 'class-validator';

export class UpdateJobEntity {
  @IsOptional()
  public title: string;

  @IsOptional()
  public description: string;

  @IsOptional()
  public location: string;

  constructor(title?: string, description?: string, location?: string) {
    this.title = title;
    this.description = description;
    this.location = location;
  }

  public static async validateUpdate(data: UpdateJobEntity): Promise<boolean> {
    if (!data) {
      throw new NotFoundException('A publicação não foi localizada');
    }

    const updateFields = [data.title, data.description, data.location];
    const emptyFields = updateFields.every(
      (field) => field === undefined || field === null || field === '',
    );

    if (emptyFields) {
      throw new BadRequestException('Não há dados fornecidos para atualizar');
    }

    return true;
  }
}
