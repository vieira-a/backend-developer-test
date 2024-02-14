import { Company } from '../../entities/company';

export interface IReadCompaniesUseCase {
  execute: () => Promise<Company[]>;
}
