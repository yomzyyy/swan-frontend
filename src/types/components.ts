import { ReactNode } from 'react';

// AdminTable column definition — generic over the row data type
export interface TableColumn<T> {
  header: string;
  accessor: keyof T & string;
  render?: (row: T) => ReactNode;
}

export type SortOrder = 'asc' | 'desc';
