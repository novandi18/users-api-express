import { Router } from 'express';
import { validatePagination, validateUser } from '../middlewares/validate.middleware';
import { createUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/users', validatePagination, getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUser, createUser);
router.put('/users/:id', validateUser, updateUser);

export default router;