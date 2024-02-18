import { ReadCompaniesOutput } from '../../../../application/company/outputs';

export const companyResponseMapper = (output: ReadCompaniesOutput) => {
  return { id: output.id, name: output.name };
};
