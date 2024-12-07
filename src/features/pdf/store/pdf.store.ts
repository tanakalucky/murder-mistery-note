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

export const usePdfStore = create<State & Action>((set, get) => ({
  pdfList: [],
  addPdf: (pdfList) => set(() => ({ pdfList })),
  deletePdf: (removeIndex) => {
    const oldList = get().pdfList;
    const newList = oldList.filter((_, idx) => idx !== removeIndex);
    return set({ pdfList: newList });
  },
}));
