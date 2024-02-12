import { EntityBase } from '../entity.base';

export class Company extends EntityBase {
  public name: string;

  protected constructor() {
    super();
  }
}
