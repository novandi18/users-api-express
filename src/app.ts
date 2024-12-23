import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/user.route';
import logger from './middlewares/logger.middleware';

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;