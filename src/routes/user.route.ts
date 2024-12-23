import { Router } from 'express';
import { validatePagination } from '../middlewares/validate.middleware';
import { getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/users', validatePagination, getAllUsers);

export default router;