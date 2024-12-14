import { type LocalizationMap, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import jp_JP from '@react-pdf-viewer/locales/lib/jp_JP.json';
import { useParams } from 'react-router-dom';
import { usePdfStore } from '../store/pdf.store';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export function loader({ params }: { params: { index: string } }): { index: string } {
  if (!params.index || Number.isNaN(Number(params.index))) {
    throw new Error('Invalid index parameter');
  }

  return { index: params.index };
}

export default function PdfViewer() {
  const { index } = useParams<ReturnType<typeof loader>>();
  const { pdfList } = usePdfStore();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!index || pdfList.length === 0) {
    throw new Error('PDF Not Found');
  }

  const pdf = pdfList[Number(index)];

  return (
    <div
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'calc(100vh - 28px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Viewer
            fileUrl={pdf.url}
            localization={jp_JP as unknown as LocalizationMap}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </div>
    </div>
  );
}
