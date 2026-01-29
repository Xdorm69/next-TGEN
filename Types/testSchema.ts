export type TestSchema = {
  _id: string;
  name: string;
  author: { _id: string; name: string };
  dateCreated: string;
  description: string;
  questions: any[];
  createdAt: Date;
  updatedAt: Date;
};
