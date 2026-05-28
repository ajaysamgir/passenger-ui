import express, { Express } from 'express';
import cors from 'cors';
import Database from './database/Database';
import { requestLogger, errorHandler } from './middleware/middleware';
import createPassengerRoutes from './routes/passengerRoutes';

export async function createApp(): Promise<Express> {
  const app = express();
  const db = new Database();

  await db.initialize();

  app.use(cors());
  app.use(express.json());
  app.use(requestLogger);

  app.use('/api', createPassengerRoutes(db));

  app.use(errorHandler);

  return app;
}

export default createApp;
