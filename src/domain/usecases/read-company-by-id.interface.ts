import { Company } from '../entities';

export interface IReadCompanyByIdUseCase {
  readById: (id: string) => Promise<Company>;
}
