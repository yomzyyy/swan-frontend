import type { ReactNode } from 'react';

export interface FieldDefinition {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  rows?: number;
  itemLabel?: string;
  fields?: FieldDefinition[];
  /** When true, an `array-objects` field's rows can be reordered by drag-and-drop. */
  sortable?: boolean;
}

export type FieldChangeHandler = (key: string, value: unknown) => void;

export type RenderFieldFn = (
  field: FieldDefinition,
  fieldData: Record<string, unknown>,
  onChange: FieldChangeHandler
) => ReactNode;

export interface FieldRendererProps {
  field: FieldDefinition;
  value: unknown;
  onChange: FieldChangeHandler;
  renderField?: RenderFieldFn;
}
