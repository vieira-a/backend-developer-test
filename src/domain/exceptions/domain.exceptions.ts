export class DomainException extends Error {
  private httpStatus: number;

  constructor(message: string, httpStatus: number) {
    super(message);
    this.name = 'DomainException';
    this.httpStatus = httpStatus;
  }

  public getStatus() {
    return this.httpStatus;
  }

  // public getDomainException(
  // ) {
  //   if (exception instanceof DomainException) {
  //     this.httpStatus = exception.getStatus();
  //     this.message = exception.message;
  //   }
  // }
}
