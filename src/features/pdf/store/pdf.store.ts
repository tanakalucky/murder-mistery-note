import { create } from 'zustand';

type Pdf = {
  url: string;
  name: string;
};

type State = {
  pdfList: Pdf[];
};

type Action = {
  addPdf: (pdfList: Pdf[]) => void;
};

export const usePdfStore = create<State & Action>((set) => ({
  pdfList: [],
  addPdf: (pdfList) => set(() => ({ pdfList })),
}));
