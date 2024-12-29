import { GoogleGenerativeAI } from '@google/generative-ai';
import { DATA_TYPES } from '../constants/dataTypes.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function suggestSchema(prompt) {
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

  const result = await model.generateContent(schemaPrompt);
  const response = await result.response;
  const suggestions = JSON.parse(response.text());
  return { prompt, suggestions };
}

export async function generateContent(columns, count) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate ${count} entries for a database with the following columns:
${columns.map(col => `- ${col.name} (${col.type}): ${col.prompt}`).join('\n')}

Return the data as a JSON array where each object has the column names as keys.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}