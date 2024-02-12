import { Company } from '../entities';

export interface IReadCompaniesUseCase {
  readAll: () => Promise<Company[]>;
}
