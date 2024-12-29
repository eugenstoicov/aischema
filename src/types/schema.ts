export type DataType =
  | 'integer'
  | 'double'
  | 'string'
  | 'boolean'
  | 'color'
  | 'imagePath'
  | 'videoPath'
  | 'audioPath'
  | 'documentReference'
  | 'dateTime'
  | 'latLng'
  | 'dataType'
  | 'enum';

export interface Column {
  name: string;
  type: DataType;
  prompt: string;
  enumValues?: string[];
  recommended?: boolean;
}

export interface GeneratedData {
  [key: string]: any;
}

export interface SchemaPrompt {
  prompt: string;
  suggestions: Column[];
}