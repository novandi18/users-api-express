import request from 'supertest';
import app from '../app';
import db from '../config/db.config';

beforeAll(async () => {
  await db.query('DELETE FROM users');
});

describe('User API Endpoints', () => {
  it('should get all users with pagination metadata', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toHaveProperty('page');
    expect(res.body.meta).toHaveProperty('limit');
    expect(res.body.meta).toHaveProperty('total_pages');
    expect(res.body.meta).toHaveProperty('total_users');
  });
});

afterAll(async () => {
  await db.query('DELETE FROM users');
  await db.end();
});