import { JobModel } from '../../infrastructure/access/repositories/job/models';

export const jobMock: JobModel = {
  id: 'd9b8203c-e87e-4366-b162-66bf0cecb429',
  companyId: '8d9451e6-4cee-46c6-9e38-ed56041de3c4',
  title: 'Backend Developer',
  description: 'Node.js, Nest.js, PostgreSQL, TypeORM',
  location: 'Brazil',
  notes: 'Loren ipsum',
  status: 'draft',
  createdAt: new Date(),
  updatedAt: new Date(),
};
