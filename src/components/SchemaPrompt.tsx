import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { Wand2 } from 'lucide-react';
import { useSchemaStore } from '../store/schemaStore';
import { suggestSchema } from '../services/ai';

export function SchemaPrompt() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const setSchemaPrompt = useSchemaStore((state) => state.setPrompt);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const suggestions = await suggestSchema(prompt);
      setSchemaPrompt(suggestions);
    } catch (error) {
      console.error('Failed to suggest schema:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Describe Your Database
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Describe what kind of database you want to create, and AI will suggest an appropriate schema.
      </Typography>
      
      <TextField
        label="Description"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        multiline
        rows={3}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading || !prompt.trim()}
        startIcon={loading ? <CircularProgress size={20} /> : <Wand2 size={20} />}
      >
        Suggest Schema
      </Button>
    </Paper>
  );
}