import { CompanyEntity } from '../../../domain/company/entities';
import {
  ReadCompanies,
  ReadCompanyById,
} from '../../../domain/company/usecases';
import { ReadCompaniesOutput } from '../outputs';

export interface CompanyDbRepository extends ReadCompanies, ReadCompanyById {
  readAll: () => Promise<ReadCompaniesOutput[]>;
  readById: (id: string) => Promise<CompanyEntity>;
}
