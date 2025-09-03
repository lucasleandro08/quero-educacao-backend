import express from 'express';
import cors from 'cors';
import offersRouter from './http/routes/offers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/offers', offersRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
