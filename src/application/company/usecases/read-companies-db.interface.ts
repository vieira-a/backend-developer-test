import { ReadCompanyOutput } from '../outputs';

export class IReadCompaniesDbUseCase {
  readAll: () => Promise<ReadCompanyOutput[]>;
}
