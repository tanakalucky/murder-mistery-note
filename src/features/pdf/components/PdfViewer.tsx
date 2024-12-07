import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { Icon, MinimalButton, Position, Tooltip, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePdfStore } from '../store/pdf.store';

import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

const TOOLTIP_OFFSET = { left: 8, top: 0 };

export function loader({ params }: { params: { index: string } }): { index: string } {
  if (!params.index || Number.isNaN(Number(params.index))) {
    throw new Error('Invalid index parameter');
  }

  return { index: params.index };
}

export default function PdfViewer() {
  const { index } = useParams<ReturnType<typeof loader>>();
  const { pdfList } = usePdfStore();

  const [sidebarOpened, setSidebarOpened] = useState(false);
  const toolbarPluginInstance = toolbarPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();

  const { Toolbar } = toolbarPluginInstance;
  const { Bookmarks } = bookmarkPluginInstance;

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
          alignItems: 'center',
          backgroundColor: '#eeeeee',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          padding: '4px',
        }}
      >
        <div style={{ marginRight: '0.25rem' }}>
          <Tooltip
            position={Position.BottomLeft}
            target={
              <MinimalButton
                ariaLabel='Toggle the bookmarks'
                isSelected={sidebarOpened}
                onClick={() => setSidebarOpened((opened) => !opened)}
              >
                <Icon size={16}>
                  <rect x='0.5' y='0.497' width='22' height='22' rx='1' ry='1' />
                  <line x1='7.5' y1='0.497' x2='7.5' y2='22.497' />
                </Icon>
              </MinimalButton>
            }
            content={() => 'Toggle the bookmarks'}
            offset={TOOLTIP_OFFSET}
          />
        </div>
        <Toolbar />
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            borderRight: sidebarOpened ? '1px solid rgba(0, 0, 0, 0.3)' : 'none',
            overflow: 'auto',
            transition: 'width 400ms ease-in-out',
            width: sidebarOpened ? '30%' : '0%',
          }}
        >
          <Bookmarks />
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <Viewer fileUrl={pdf.url} plugins={[bookmarkPluginInstance, toolbarPluginInstance]} />
        </div>
      </div>
    </div>
  );
}
