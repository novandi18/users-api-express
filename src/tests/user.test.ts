import request from 'supertest';
import app from '../app';
import db from '../config/db.config';

beforeAll(async () => {
  await db.query('DELETE FROM users');
});

describe('User API Endpoints', () => {
  let userId: string;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Novandi',
        email: 'novandi@example.com',
        age: 30,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.name).toBe('Novandi');
    expect(res.body.data.email).toBe('novandi@example.com');
    expect(res.body.data.age).toBe(30);
    expect(res.body.data).toHaveProperty('created_at');
    expect(res.body.data).toHaveProperty('updated_at');
    userId = res.body.data.id;
  });

  it('should not create a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Another Novandi',
        email: 'novandi@example.com',
        age: 35,
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email is already in use');
  });

  it('should get all users with pagination metadata', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.meta).toHaveProperty('page');
    expect(res.body.meta).toHaveProperty('limit');
    expect(res.body.meta).toHaveProperty('total_pages');
    expect(res.body.meta).toHaveProperty('total_users');
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('id', userId);
    expect(res.body.data.name).toBe('Novandi');
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        name: 'Rizka',
        email: 'rizka@example.com',
        age: 28,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Rizka');
    expect(res.body.data.email).toBe('rizka@example.com');
  });

  it('should not update a user with an existing email', async () => {
    await request(app)
      .post('/api/users')
      .send({
        name: 'Original Rizka',
        email: 'rizka@example.com',
        age: 30,
      });
  
    const anotherUserRes = await request(app)
      .post('/api/users')
      .send({
        name: 'Another Rizka',
        email: 'rizka2@example.com',
        age: 25,
      });
    expect(anotherUserRes.statusCode).toBe(201);
    const anotherUserId = anotherUserRes.body.data.id;
  
    const res = await request(app)
      .put(`/api/users/${anotherUserId}`)
      .send({
        name: 'Duplicate Rizka',
        email: 'rizka@example.com',
        age: 26,
      });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email is already in use');
  });
});

afterAll(async () => {
  await db.query('DELETE FROM users');
  await db.end();
  
});