import { ReadJobOutput } from '../../../../application/job/outputs';

export interface ReadJobResponse {
  message?: string;
  data?: ReadJobOutput;
}
