import { ReadCompanyOutput } from '../outputs/read-companies.output';

export class IReadCompaniesDbUseCase {
  readAll: () => Promise<ReadCompanyOutput[]>;
}
