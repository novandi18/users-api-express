import { Router } from 'express';
import { validatePagination, validateUser } from '../middlewares/validate.middleware';
import { createUser, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/users', validatePagination, getAllUsers);
router.post('/users', validateUser, createUser);

export default router;