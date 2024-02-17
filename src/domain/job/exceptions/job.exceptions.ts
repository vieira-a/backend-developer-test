import { DomainException } from '../../exceptions/domain.exceptions';

export class JobException {
  public static emptyCompanyId(): never {
    throw new DomainException('Por favor, informe o ID da empresa', 400);
  }

  public static companyIdFormatInvalid(): never {
    throw new DomainException(
      'O ID da empresa não está no formato inválido',
      422,
    );
  }

  public static emptyTitle(): never {
    throw new DomainException(
      'Por favor, informe um título para a publicação',
      400,
    );
  }

  public static emptyDescription(): never {
    throw new DomainException(
      'Por favor, informe uma descrição para a publicação',
      400,
    );
  }

  public static emptyLocation(): never {
    throw new DomainException('Por favor, informe a localização', 400);
  }

  public static publicationNotFound(): never {
    throw new DomainException('A publicação não foi localizada', 400);
  }

  public static invalidPublicationStatus(): never {
    throw new DomainException(
      'Apenas postagens publicadas podem ser arquivadas',
      422,
    );
  }

  public static publicationAlreadyPublished(): never {
    throw new DomainException('Esta postagem já foi publicada', 422);
  }

  public static rejectedPublication(): never {
    throw new DomainException(
      'Postagens rejeitadas não podem ser publicadas',
      422,
    );
  }
}
