export interface IDeleteJobDraft {
  delete: (id: string) => Promise<boolean>;
}
