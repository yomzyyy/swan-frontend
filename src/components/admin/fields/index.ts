export { default as TextField } from './TextField';
export { default as TextAreaField } from './TextAreaField';
export { default as ArrayTextField } from './ArrayTextField';
export { default as ObjectField } from './ObjectField';
export { default as ArrayObjectsField } from './ArrayObjectsField';
export { default as ImageUploadField } from './ImageUploadField';

export type { FieldDefinition, FieldChangeHandler, RenderFieldFn, FieldRendererProps } from './types';

import type { FieldRendererProps } from './types';
import TextField from './TextField';
import TextAreaField from './TextAreaField';
import ArrayTextField from './ArrayTextField';
import ObjectField from './ObjectField';
import ArrayObjectsField from './ArrayObjectsField';
import ImageUploadField from './ImageUploadField';

export const FIELD_RENDERERS: Record<string, React.ComponentType<FieldRendererProps>> = {
  text: TextField,
  url: TextField,
  textarea: TextAreaField,
  'array-text': ArrayTextField,
  object: ObjectField,
  'array-objects': ArrayObjectsField,
  image: ImageUploadField
};
