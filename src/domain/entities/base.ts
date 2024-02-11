export abstract class EntityBase {
  public id?: string;

  public createdAt: Date;

  public updatedAt: Date;

  protected constructor() {}
}
