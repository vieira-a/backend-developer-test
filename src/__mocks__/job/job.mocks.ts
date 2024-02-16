import { CreateJobOutput } from '../../application/job/outputs/create-job-output.interface';
import { JobStatus } from '../../domain/enums';
import { JobDbModel } from '../../infrastructure/access/repositories/job/models/job-db.model';

export const jobMock: JobDbModel = {
  companyId: '8d9451e6-4cee-46c6-9e38-ed56041de3c4',
  title: 'Backend Developer',
  description: 'Node.js, Nest.js, PostgreSQL, TypeORM',
  location: 'Brazil',
  notes: 'Loren ipsum',
  status: JobStatus.DRAFT,
  archive: function (): CreateJobOutput {
    throw new Error('Function not implemented.');
  },
  publish: function (): CreateJobOutput {
    throw new Error('Function not implemented.');
  },
};
