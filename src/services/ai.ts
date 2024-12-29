import { GoogleGenerativeAI } from '@google/generative-ai';
import { Column, GeneratedData, SchemaPrompt } from '../types/schema';
import { DATA_TYPES } from '../constants/dataTypes';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function suggestSchema(prompt: string): Promise<SchemaPrompt> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const schemaPrompt = `Based on this description: "${prompt}"
  
Suggest a database schema with appropriate columns. For each column, provide:
1. A meaningful name
2. The most suitable data type from this list: ${DATA_TYPES.map(t => t.value).join(', ')}
3. A clear prompt for generating realistic data for that column

Return the response as a JSON array of objects with these properties:
- name: column name
- type: data type
- prompt: generation prompt

Make sure the schema is comprehensive and practical for the described use case.`;

  try {
    const result = await model.generateContent(schemaPrompt);
    const response = await result.response;
    const suggestions = JSON.parse(response.text());
    return { prompt, suggestions };
  } catch (error) {
    console.error('Error suggesting schema:', error);
    throw error;
  }
}

export async function generateContent(
  columns: Column[],
  count: number
): Promise<GeneratedData[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate ${count} entries for a database with the following columns:
${columns
  .map(
    (col) =>
      `- ${col.name} (${col.type}): ${col.prompt}`
  )
  .join('\n')}

Return the data as a JSON array where each object has the column names as keys.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}