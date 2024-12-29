import { Column, GeneratedData, SchemaPrompt } from '../types/schema';

const API_URL = import.meta.env.VITE_API_URL;

export async function suggestSchema(prompt: string): Promise<SchemaPrompt> {
  try {
    const response = await fetch(`${API_URL}/suggest-schema`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) throw new Error('Failed to suggest schema');
    return await response.json();
  } catch (error) {
    console.error('Error suggesting schema:', error);
    throw error;
  }
}

export async function generateContent(
  columns: Column[],
  count: number
): Promise<GeneratedData[]> {
  try {
    const response = await fetch(`${API_URL}/generate-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columns, count }),
    });
    
    if (!response.ok) throw new Error('Failed to generate content');
    return await response.json();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}