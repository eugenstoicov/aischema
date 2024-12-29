import { create } from 'zustand';
import { Column, GeneratedData, SchemaPrompt } from '../types/schema';

interface SchemaStore {
  prompt: SchemaPrompt | null;
  columns: Column[];
  generatedData: GeneratedData[];
  setPrompt: (prompt: SchemaPrompt) => void;
  addColumn: (column: Column) => void;
  removeColumn: (index: number) => void;
  updateColumn: (index: number, column: Column) => void;
  setGeneratedData: (data: GeneratedData[]) => void;
}

export const useSchemaStore = create<SchemaStore>((set) => ({
  prompt: null,
  columns: [],
  generatedData: [],
  setPrompt: (prompt) => set({ prompt }),
  addColumn: (column) =>
    set((state) => ({ columns: [...state.columns, column] })),
  removeColumn: (index) =>
    set((state) => ({
      columns: state.columns.filter((_, i) => i !== index),
    })),
  updateColumn: (index, column) =>
    set((state) => ({
      columns: state.columns.map((c, i) => (i === index ? column : c)),
    })),
  setGeneratedData: (data) => set({ generatedData: data }),
}));