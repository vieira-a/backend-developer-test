import { CompanyEntity } from '../../../domain/company/entities';

export class ReadCompanyOutput extends CompanyEntity {
  id?: string;

  name: string;
}
