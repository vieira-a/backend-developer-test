import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ArchiveJobResponse,
  DeleteJobResponse,
  ReadJobResponse,
  UpdateJobResponse,
} from '../../../api/transports/job/responses';
import { ReadJobOutput } from '../../../application/job/outputs';

@Injectable()
export class JobPresenter {
  async createJobResult(output: boolean) {
    if (!output) {
      return {
        message: 'Houve uma falha ao criar publicação',
      };
    }
    return {
      message: 'Publicação criada com sucesso',
    };
  }

  async readJobResult(output: ReadJobOutput): Promise<ReadJobResponse> {
    if (!output) {
      throw new NotFoundException('A publicação não foi encontrada ');
    }
    return {
      data: output,
    };
  }

  async deleteJobResult(output: boolean): Promise<DeleteJobResponse> {
    if (!output) {
      return {
        success: false,
        message: 'Houve uma falha ao excluir a publicação',
      };
    }
    return {
      success: true,
      message: 'A publicação foi excluída com sucesso',
    };
  }

  async archiveJobResult(output: boolean): Promise<ArchiveJobResponse> {
    if (!output) {
      return {
        success: false,
        message: 'Houve uma falha ao arquivar a publicação',
      };
    }
    return {
      success: true,
      message: 'A publicação foi arquivada com sucesso',
    };
  }

  async updateJobResult(output: boolean): Promise<UpdateJobResponse> {
    if (!output) {
      return {
        success: false,
        message: 'Não há dados para atualizar',
      };
    }
    return {
      success: true,
      message: 'A publicação foi atualizada com sucesso',
    };
  }
}
