import http from 'http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { swaggerDocs, swaggerUiHandler } from './utils.ts/swagger';
import { setStore } from './stores/receiptStoreContext';
import { InMemoryReceiptStore } from './stores/InMemoryReceiptStore';

import recieptRoutes from './routes/receipts';
import logger from './utils.ts/logger';

logger.info('Environment variables loaded');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
logger.info('Middleware initialized');

setStore(InMemoryReceiptStore);
logger.info({ store: 'InMemoryReceiptStore' }, 'Receipt store initialized');

app.use('/receipts', recieptRoutes);
app.use('/docs', swaggerUiHandler, swaggerDocs);
logger.info('API routes registered: /receipts, /docs');

server.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server started');
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

export default app;
