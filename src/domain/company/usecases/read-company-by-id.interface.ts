import { CompanyEntity } from '../entities';

export interface ReadCompanyById {
  readById: (id: string) => Promise<CompanyEntity>;
}
