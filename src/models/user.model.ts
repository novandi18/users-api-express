import { RowDataPacket } from 'mysql2';
import db from '../config/db.config';
import { User } from '../interfaces/user.response';

export class UserModel {
  static async countAllUsers(): Promise<number> {
    try {
      const [rows] = await db.query<RowDataPacket[]>(`SELECT COUNT(*) as count FROM users`);
      return rows[0].count;
    } catch (error) {
      console.error('Database query error in countAllUsers:', error);
      throw new Error('Could not count users');
    }
  }

  static async findAll(page: number = 1, limit: number = 10): Promise<User[]> {
    try {
      const offset = (page - 1) * limit;
      const [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`, [limit, offset]);
      return rows as User[];
    } catch (error) {
      console.error('Database query error in findAll:', error);
      throw new Error('Could not retrieve users');
    }
  }
}