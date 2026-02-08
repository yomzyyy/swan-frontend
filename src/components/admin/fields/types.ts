import type { ReactNode } from 'react';

export interface FieldDefinition {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  rows?: number;
  itemLabel?: string;
  fields?: FieldDefinition[];
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
