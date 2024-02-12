import { ReadCompanyOutput } from '../outputs';

export class IReadCompanyDbUseCase {
  readAll: () => Promise<ReadCompanyOutput[]>;
  readById: (id: string) => Promise<ReadCompanyOutput>;
}
