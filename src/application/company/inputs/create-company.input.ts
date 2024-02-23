import { CompanyEntity } from '../../../domain/company/entities';

export class CreateCompanyInput extends CompanyEntity {
  id?: string;

  name: string;
}
