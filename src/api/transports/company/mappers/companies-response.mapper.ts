import { ReadCompaniesOutput } from '../../../../application/company/outputs';

export const companiesResponseMapper = (output: ReadCompaniesOutput[]) => {
  return output.map((company) => ({ id: company.id, name: company.name }));
};
