import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/user.route';
import logger from './middlewares/logger.middleware';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);

app.use('/api', userRoutes);

export default app;