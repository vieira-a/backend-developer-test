import { Company } from '../../entities/company';

export interface IReadCompanyByIdUseCase {
  readById: (id: string) => Promise<Company>;
}
