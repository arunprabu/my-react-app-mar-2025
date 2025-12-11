export interface INote {
  id: string | number | Date;
  title: string;
  content: string;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
}

export type NotesState = INote[];
