import { CompanyEntity } from '../entities';

export interface ReadCompanies {
  readAll: () => Promise<CompanyEntity[]>;
}
