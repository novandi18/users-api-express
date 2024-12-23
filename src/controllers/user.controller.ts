import { Request, Response } from 'express'; 
import { v4 as uuidv4 } from 'uuid';
import { validate as isUuid } from 'uuid';
import { User, UserResult, UsersResult } from '../interfaces/user.response';
import { Result } from '../interfaces/result.response';
import { UserModel } from '../models/user.model';

export const getAllUsers = async (req: Request, res: Response<UsersResult | Result>): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const users: User[] = await UserModel.findAll(page, limit);
    const totalUserCount = await UserModel.countAllUsers();
    const totalPages = Math.ceil(totalUserCount / limit);

    res.status(200).json({
      message: 'Users retrieved successfully',
      success: true,
      data: users,
      meta: {
        page,
        limit,
        total_pages: totalPages,
        total_users: totalUserCount,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', success: false });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response<UserResult | Result>): Promise<void> => {
  const { name, email, age } = req.body;
  const id = uuidv4();
  const user: User = { id, name, email, age };

  try {
    const newUser = await UserModel.create(user);
    res.status(201).json({ message: 'User created successfully', success: true, data: newUser });
  } catch (error: any) {
    if (error.message === 'Email is already in use') {
      res.status(409).json({ message: error.message, success: false }); // 409 Conflict
    } else {
      res.status(500).json({ message: 'Failed to create user', success: false });
    }
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response<UserResult | Result>): Promise<void> => {
  const id = req.params.id;

  if (!isUuid(id)) {
    res.status(400).json({ message: 'User not found', success: false });
    return;
  }

  try {
    const user: User | null = await UserModel.findById(id);
    if (user) {
      res.status(200).json({ message: 'User retrieved successfully', success: true, data: user });
    } else {
      res.status(404).json({ message: 'User not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', success: false });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response<UserResult | Result>): Promise<void> => {
  const id = req.params.id;

  if (!isUuid(id)) {
    res.status(400).json({ message: 'Failed to update user', success: false });
    return;
  }

  const { name, email, age } = req.body;

  try {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      res.status(404).json({ message: 'User not found', success: false });
      return;
    }

    const updatedUser: Partial<User> = { name, email, age };
    const user = await UserModel.update(id, updatedUser);
    
    const updatedUserData = { ...existingUser, ...user };
    res.status(200).json({ message: 'User updated successfully', success: true, data: updatedUserData });
  } catch (error: any) {
    if (error.message === 'Email is already in use') {
      res.status(409).json({ message: error.message, success: false }); // 409 Conflict
    } else {
      res.status(500).json({ message: 'Failed to update user', success: false });
    }
  }
};