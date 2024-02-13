import { Company } from '../../entities/company';

export interface IReadCompanyByIdUseCase {
  execute: (id: string) => Promise<Company>;
}
