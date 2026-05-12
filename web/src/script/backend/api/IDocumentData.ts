export type TDocumentMeta = {
  created: {
    by: string;
    at: Date;
  },
  altered?: {
    by: string;
    at: Date;
  }
}

export interface IDocumentData {
  meta?: TDocumentMeta;
}
