import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { Plus, X } from 'lucide-react';
import { useSchemaStore } from '../store/schemaStore';
import { Column } from '../types/schema';
import { DATA_TYPES } from '../constants/dataTypes';

export function SchemaSuggestions() {
  const { prompt, columns } = useSchemaStore();
  const addColumn = useSchemaStore((state) => state.addColumn);

  if (!prompt) return null;

  const handleAddColumn = (column: Column) => {
    addColumn({ ...column, recommended: true });
  };

  const isColumnAdded = (column: Column) => 
    columns.some(c => c.name === column.name);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Suggested Schema
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Based on your description: "{prompt.prompt}"
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {prompt.suggestions.map((column, index) => (
          <Card key={index} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" component="h3">
                    {column.name}
                  </Typography>
                  <Chip
                    label={DATA_TYPES.find(t => t.value === column.type)?.label}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {column.prompt}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={isColumnAdded(column) ? <X size={16} /> : <Plus size={16} />}
                  onClick={() => handleAddColumn(column)}
                  disabled={isColumnAdded(column)}
                >
                  {isColumnAdded(column) ? 'Added' : 'Add'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}