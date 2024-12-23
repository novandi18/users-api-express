import { Request, Response } from 'express';
import { User, UsersResult } from '../interfaces/user.response';
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