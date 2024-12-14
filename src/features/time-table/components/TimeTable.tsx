import '@handsontable/pikaday/css/pikaday.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.min.css';

import type { HotTableClass } from '@handsontable/react';
import { jaJP, registerLanguageDictionary } from 'handsontable/i18n';
import { registerAllModules } from 'handsontable/registry';
import type { CellChange } from 'node_modules/handsontable/common';
import { useEffect, useRef, useState } from 'react';

registerAllModules();
registerLanguageDictionary(jaJP);

const initialData = new Array(10).fill('').map(() => new Array(2).fill(''));

export default function TimeTable() {
  const hotTableRef = useRef<HotTableClass | null>(null);

  const savedData = localStorage.getItem('handsontable-data');
  const tableInitialData = savedData ? JSON.parse(savedData) : initialData;

  const [tableData] = useState<string[][]>(tableInitialData);

  useEffect(() => {
    const hotInstance = hotTableRef.current?.hotInstance;

    if (hotInstance) {
      const handleChange = (changes: CellChange[] | null) => {
        if (changes) {
          const currentData = hotInstance.getData();
          saveData(currentData);
        }
      };

      hotInstance.addHook('afterChange', handleChange);

      return () => {
        hotInstance.removeHook('afterChange', handleChange);
      };
    }
  }, []);

  return (
    <HotTable
      id='hot-table'
      ref={hotTableRef}
      data={tableData}
      autoWrapRow={true}
      language={jaJP.languageCode}
      colHeaders={['時刻', 'メモ']}
      columns={[{ editor: 'text' }, { editor: 'text' }]}
      licenseKey='non-commercial-and-evaluation'
      autoRowSize
      rowHeaders={true}
      contextMenu={true}
      hiddenRows={{
        indicators: true,
      }}
      undo={true}
      manualRowResize={true}
      manualColumnResize={true}
      persistentState={true}
    />
  );
}

const saveData = (data: string[][]) => {
  localStorage.setItem('handsontable-data', JSON.stringify(data));
};
