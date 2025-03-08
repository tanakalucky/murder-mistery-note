import { Clock, FileText, Tag } from 'lucide-react';
import { useState } from 'react';
import { Memo } from './feature/memo/Memo';
import { PdfManager } from './feature/pdf-manager/PdfManager';
import { TagManager } from './feature/tag-manager/TagManager';
import { Timeline } from './feature/timeline/Timeline';

const DragDropMysteryApp = () => {
  const [rightPanelMode, setRightPanelMode] = useState<'tags' | 'timeline' | 'pdf'>('tags');

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 flex flex-col overflow-hidden p-4 border-r">
        <Memo />
      </div>

      <div className="w-1/2 bg-white p-4 overflow-hidden flex flex-col">
        <div className="mb-3 border-b">
          <div className="flex bg-muted rounded-t-md overflow-hidden">
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center text-sm ${rightPanelMode === 'tags' ? 'bg-white font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setRightPanelMode('tags')}
            >
              <Tag className="mr-1 h-4 w-4" />
              タグ
            </button>
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center text-sm ${rightPanelMode === 'timeline' ? 'bg-white font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setRightPanelMode('timeline')}
            >
              <Clock className="mr-1 h-4 w-4" />
              タイムライン
            </button>
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center text-sm ${rightPanelMode === 'pdf' ? 'bg-white font-medium' : 'hover:bg-gray-50'}`}
              onClick={() => setRightPanelMode('pdf')}
            >
              <FileText className="mr-1 h-4 w-4" />
              PDF
            </button>
          </div>
        </div>

        {rightPanelMode === 'tags' && <TagManager />}
        {rightPanelMode === 'timeline' && <Timeline />}
        {rightPanelMode === 'pdf' && <PdfManager />}
      </div>
    </div>
  );
};

export default DragDropMysteryApp;
