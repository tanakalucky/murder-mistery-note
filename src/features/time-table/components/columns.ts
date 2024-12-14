import type { ColumnDef } from '@tanstack/react-table';

export type Column = {
  time: string;
  note: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'time',
    header: '時刻',
  },
  {
    accessorKey: 'note',
    header: 'ノート',
  },
];
