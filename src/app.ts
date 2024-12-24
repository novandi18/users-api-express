import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/user.route';
import logger from './middlewares/logger.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger.docs';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', userRoutes);

export default app;