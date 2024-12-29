import React from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import { useSchemaStore } from '../store/schemaStore';
import { DATA_TYPES } from '../constants/dataTypes';

export function ColumnList() {
  const { columns, removeColumn } = useSchemaStore();

  if (columns.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        No columns added yet. Add a column to get started.
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {columns.map((column, index) => (
        <Card key={index}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h6" component="h3">
                  {column.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Type: {DATA_TYPES.find(t => t.value === column.type)?.label}
                </Typography>
                {column.enumValues && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Enum Values:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {column.enumValues.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}
                <Typography variant="body2">{column.prompt}</Typography>
              </Box>
              <IconButton
                onClick={() => removeColumn(index)}
                color="error"
                size="small"
              >
                <Trash2 size={20} />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}