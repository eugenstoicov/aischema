import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  Typography,
  Chip,
} from '@mui/material';
import { PlusCircle } from 'lucide-react';
import { Column, DataType } from '../types/schema';
import { useSchemaStore } from '../store/schemaStore';
import { DATA_TYPES } from '../constants/dataTypes';

export function ColumnForm() {
  const addColumn = useSchemaStore((state) => state.addColumn);
  const [column, setColumn] = useState<Column>({
    name: '',
    type: 'string',
    prompt: '',
  });
  const [enumValue, setEnumValue] = useState('');
  const [enumValues, setEnumValues] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (column.name && column.prompt) {
      addColumn({
        ...column,
        enumValues: column.type === 'enum' ? enumValues : undefined,
      });
      setColumn({ name: '', type: 'string', prompt: '' });
      setEnumValues([]);
    }
  };

  const handleTypeChange = (type: DataType) => {
    setColumn({ ...column, type });
    if (type !== 'enum') {
      setEnumValues([]);
    }
  };

  const handleAddEnumValue = () => {
    if (enumValue && !enumValues.includes(enumValue)) {
      setEnumValues([...enumValues, enumValue]);
      setEnumValue('');
    }
  };

  const handleRemoveEnumValue = (value: string) => {
    setEnumValues(enumValues.filter((v) => v !== value));
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Column Name"
          value={column.name}
          onChange={(e) => setColumn({ ...column, name: e.target.value })}
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Data Type</InputLabel>
          <Select
            value={column.type}
            onChange={(e) => handleTypeChange(e.target.value as DataType)}
            label="Data Type"
          >
            {DATA_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {column.type === 'enum' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Enum Values
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                value={enumValue}
                onChange={(e) => setEnumValue(e.target.value)}
                placeholder="Add enum value"
              />
              <Button
                variant="outlined"
                onClick={handleAddEnumValue}
                disabled={!enumValue}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {enumValues.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleRemoveEnumValue(value)}
                />
              ))}
            </Box>
          </Box>
        )}

        <TextField
          label="Generation Prompt"
          value={column.prompt}
          onChange={(e) => setColumn({ ...column, prompt: e.target.value })}
          required
          multiline
          rows={3}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<PlusCircle size={20} />}
          disabled={!column.name || !column.prompt || (column.type === 'enum' && enumValues.length === 0)}
        >
          Add Column
        </Button>
      </Box>
    </Paper>
  );
}