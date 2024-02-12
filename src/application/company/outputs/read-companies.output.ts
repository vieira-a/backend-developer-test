import { Company } from '../../../domain/entities';

export class ReadCompanyOutput extends Company {
  id?: string;

  name: string;
}
