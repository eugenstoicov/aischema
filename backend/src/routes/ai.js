import express from 'express';
import { suggestSchema, generateContent } from '../services/ai.js';

export const aiRouter = express.Router();

aiRouter.post('/suggest-schema', async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const result = await suggestSchema(prompt);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

aiRouter.post('/generate-content', async (req, res, next) => {
  try {
    const { columns, count } = req.body;
    const result = await generateContent(columns, count);
    res.json(result);
  } catch (error) {
    next(error);
  }
});