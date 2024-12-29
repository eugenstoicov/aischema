import { DataType } from '../types/schema';

export const DATA_TYPES: { label: string; value: DataType }[] = [
  { label: 'Integer', value: 'integer' },
  { label: 'Double', value: 'double' },
  { label: 'String', value: 'string' },
  { label: 'Boolean', value: 'boolean' },
  { label: 'Color', value: 'color' },
  { label: 'Image Path', value: 'imagePath' },
  { label: 'Video Path', value: 'videoPath' },
  { label: 'Audio Path', value: 'audioPath' },
  { label: 'Document Reference', value: 'documentReference' },
  { label: 'Date Time', value: 'dateTime' },
  { label: 'Latitude/Longitude', value: 'latLng' },
  { label: 'Data Type', value: 'dataType' },
  { label: 'Enum', value: 'enum' },
];