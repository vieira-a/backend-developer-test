import { Injectable } from '@nestjs/common';

import {
  DeleteJobResponse,
  ReadJobResponse,
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

  async readJobResult(output: ReadJobOutput | null): Promise<ReadJobResponse> {
    if (!output) {
      return {
        message: 'A publicação não foi encontrada',
      };
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

  async updatedDraftSuccess() {
    return { message: 'Registro atualizado com sucesso' };
  }

  async updatedDraftNotSuccess() {
    return { message: 'Sem dados para atualizar' };
  }

  async deletedDraftSuccess() {
    return { message: 'Registro excluído com sucesso' };
  }

  async deletedDraftNotSuccess() {
    return { message: 'Registro não excluído' };
  }

  async archiveDraftSuccess() {
    return { message: 'Postagem arquivada com sucesso' };
  }

  async archiveDraftNotSuccess() {
    return { message: 'Postagem não arquivada' };
  }
}
