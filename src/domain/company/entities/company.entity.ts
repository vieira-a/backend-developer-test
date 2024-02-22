import { EntityBase } from '../../entities/entity.base';

export class CompanyEntity extends EntityBase {
  public name: string;

  protected constructor() {
    super();
  }
}
