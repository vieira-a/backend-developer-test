import { JobStatus } from '../../domain/enums';
import { JobDbModel } from '../../infrastructure/database/access/repositories/job/models/job-db.model';

export const jobMock: JobDbModel = {
  companyId: '8d9451e6-4cee-46c6-9e38-ed56041de3c4',
  title: 'Backend Developer',
  description: 'Node.js, Nest.js, PostgreSQL, TypeORM',
  location: 'Brazil',
  notes: 'Loren ipsum',
  status: JobStatus.DRAFT,
};

export const feedMock = `[
  {
    id: '4607f9f6-8e67-4c93-accf-4c173b944ba1',
    title: 'Desenvolvedor Backend Senior',
    description: 'React, Node.js, Nest.js, PostgreSQL, TypeORM',
    company: 'ABC Corp',
    createdAt: '2024-02-21T16:31:38.563Z',
  },
  {
    id: '6a955dc0-b8aa-495b-9712-b5e035ec1a70',
    title: 'Desenvolvedor Frontend Junior',
    description: 'React, Next.js',
    company: 'XYZ LLC',
    createdAt: '2024-02-22T18:25:09.555Z',
  },
  {
    id: '2affd80a-48ae-47e9-b3f5-e17af01156fa',
    title: 'Desenvolvedor Fullstack Pleno',
    description: 'Node.js, Nest.js, React, Next.js, PostgreSQL, TypeORM',
    company: 'ACME Enterprises',
    createdAt: '2024-02-22T18:26:06.296Z',
  },
]`;
