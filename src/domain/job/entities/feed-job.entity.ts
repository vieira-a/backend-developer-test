import { CompanyEntity } from '../../../domain/company/entities';
import { EntityBase } from '../../entities/entity.base';

export class FeedJobEntity extends EntityBase {
  public title: string;

  public description: string;

  public company: CompanyEntity;

  public createdAt?: Date;
}
