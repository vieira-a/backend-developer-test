import { Company } from '../../entities/company';

export interface IReadCompaniesUseCase {
  readAll: () => Promise<Company[]>;
}
