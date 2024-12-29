import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import { Download, Play } from 'lucide-react';
import { useSchemaStore } from '../store/schemaStore';
import { generateContent } from '../services/ai';

export function Generator() {
  const { columns, generatedData, setGeneratedData } = useSchemaStore();
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (columns.length === 0) return;
    
    setLoading(true);
    try {
      const data = await generateContent(columns, count);
      setGeneratedData(data);
    } catch (error) {
      console.error('Failed to generate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(generatedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 3 }}>
        <TextField
          label="Number of Entries"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          inputProps={{ min: 1, max: 100 }}
          sx={{ width: 150 }}
        />
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || columns.length === 0}
          startIcon={loading ? <CircularProgress size={20} /> : <Play size={20} />}
        >
          Generate Data
        </Button>
      </Box>

      {generatedData.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Generated Data</Typography>
            <Button
              variant="outlined"
              startIcon={<Download size={20} />}
              onClick={handleDownload}
            >
              Download JSON
            </Button>
          </Box>
          <Paper
            sx={{
              p: 2,
              bgcolor: 'grey.900',
              color: 'common.white',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>
              {JSON.stringify(generatedData, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Paper>
  );
}