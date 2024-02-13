import { CompanyModel } from '../../infrastructure/access/repositories/company/models';

export const companiesMock: CompanyModel[] = [
  {
    id: 'e76c5b34-230f-48d3-9ae5-3cb67f141903',
    name: 'Contoso',
    jobs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '57836e2d-5638-46c5-a847-7082d99bf3f4',
    name: 'Acme',
    jobs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
