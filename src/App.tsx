import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Database } from 'lucide-react';
import { SchemaPrompt } from './components/SchemaPrompt';
import { SchemaSuggestions } from './components/SchemaSuggestions';
import { ColumnForm } from './components/ColumnForm';
import { ColumnList } from './components/ColumnList';
import { Generator } from './components/Generator';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Database size={48} style={{ color: '#1976d2' }} />
          <Typography variant="h3" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
            AI Database Content Generator
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Define your database schema and generate realistic content using AI
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <SchemaPrompt />
          <SchemaSuggestions />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Add Column
                </Typography>
                <ColumnForm />
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Schema
                </Typography>
                <ColumnList />
              </Paper>
            </Box>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Generate Data
              </Typography>
              <Generator />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;