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

  static async create(user: User): Promise<User> {
    try {
      const { id, name, email, age } = user;
      await db.query('INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)', [id, name, email, age]);
  
      const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] as User;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email is already in use');
      }
      console.error('Database query error in create:', error);
      throw new Error('Could not create user');
    }
  }

  static async findById(id: string): Promise<User | null> {
    try {
      const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
      return rows.length > 0 ? (rows[0] as User) : null;
    } catch (error) {
      console.error('Database query error in findById:', error);
      throw new Error('Could not retrieve user');
    }
  }

  static async update(id: string, user: Partial<User>): Promise<User> {
    try {
      await db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
  
      const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0] as User;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email is already in use');
      }
      console.error('Database query error in update:', error);
      throw new Error('Could not update user');
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await db.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Database query error in delete:', error);
      throw new Error('Could not delete user');
    }
  }
}