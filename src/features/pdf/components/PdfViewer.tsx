import { Viewer } from '@react-pdf-viewer/core';
import { useParams } from 'react-router-dom';
import { usePdfStore } from '../store/pdf.store';
import '@react-pdf-viewer/core/lib/styles/index.css';

export function loader({ params }: { params: { index: string } }): { index: string } {
  if (!params.index || Number.isNaN(Number(params.index))) {
    throw new Error('Invalid index parameter');
  }

  return { index: params.index };
}

export default function PdfViewer() {
  const { index } = useParams<ReturnType<typeof loader>>();
  const { pdfList } = usePdfStore();

  if (!index || pdfList.length === 0) {
    throw new Error('PDF Not Found');
  }

  const pdf = pdfList[Number(index)];

  return (
    <div className='h-100'>
      <Viewer fileUrl={pdf.url} />
    </div>
  );
}
