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
  deletePdf: (removeIndex: number) => void;
};

export const usePdfStore = create<State & Action>((set) => ({
  pdfList: [],
  addPdf: (pdfList) => set(() => ({ pdfList })),
  deletePdf: (removeIndex: number) =>
    set((state) => ({
      pdfList: state.pdfList.filter((_, idx) => idx !== removeIndex),
    })),
}));
