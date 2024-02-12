import { Company } from '../../../domain/entities/company';

export class ReadCompanyOutput extends Company {
  id?: string;

  name: string;
}
