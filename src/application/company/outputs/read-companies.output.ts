import { CompanyEntity } from '../../../domain/company/entities';

export class ReadCompaniesOutput extends CompanyEntity {
  id?: string;

  name: string;
}
