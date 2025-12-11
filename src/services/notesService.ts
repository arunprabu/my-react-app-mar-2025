import { INote } from "../models/notes/INote";

const NOTES_KEY = 'notes';

export const getNotes = (): INote[] => {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as INote[];
  } catch (err) {
    console.error('Failed to read notes from localStorage', err);
    return [];
  }
}

export const saveNotes = (notes: INote[]) => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage', err);
  }
}
