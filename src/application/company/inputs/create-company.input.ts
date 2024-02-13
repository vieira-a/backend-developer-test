import { Company } from '../../../domain/entities/company';

export class CreateCompanyInput extends Company {
  id?: string;

  name: string;
}
