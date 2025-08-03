const request = require('supertest');
const app = require('../app');
const setupTestDB = require('./setupTestDB');

let mongoServer;

beforeAll(async () => {
  mongoServer = await setupTestDB();
});

afterAll(async () => {
  await setupTestDB.stop(mongoServer);
});

describe('Auth Routes', () => {
  it('should return 400 if email is missing during signup', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ password: 'test1234' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it('should signup successfully and return token', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'pass1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should login successfully with valid credentials', async () => {
    // First, signup
    await request(app)
      .post('/api/auth/signup')
      .send({ email: 'login@example.com', password: 'pass1234' });

    // Now, login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'pass1234' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
  it('should return 400 if user already exists', async () => {
  // create user first
  await request(app).post('/api/auth/signup').send({
    email: 'duplicate@example.com',
    password: '12345678'
  });

  const res = await request(app).post('/api/auth/signup').send({
    email: 'duplicate@example.com',
    password: '12345678'
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/exists/i);
  });

it('should return 400 for login with wrong password', async () => {
  await request(app).post('/api/auth/signup').send({
    email: 'wrongpass@example.com',
    password: 'correctpass'
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'wrongpass@example.com',
    password: 'wrongpass'
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/invalid/i);
});
it('should return 400 if email is missing during signup', async () => {
  const res = await request(app).post('/api/auth/signup').send({
    password: 'testpass123',
  });
  expect(res.statusCode).toBe(400); // optional: if you added that check
});

it('should return 400 if password is missing during signup', async () => {
  const res = await request(app).post('/api/auth/signup').send({
    email: 'missingpass@example.com',
  });
  expect(res.statusCode).toBe(400); // optional: if you added that check
});

it('should return 400 if user already exists', async () => {
  const email = 'duplicate@example.com';
  await request(app).post('/api/auth/signup').send({ email, password: '12345678' });

  const res = await request(app).post('/api/auth/signup').send({ email, password: '12345678' });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/exists/i);
});

it('should return 400 for login with incorrect password', async () => {
  const email = 'wrongpass@example.com';
  await request(app).post('/api/auth/signup').send({ email, password: 'rightpass' });

  const res = await request(app).post('/api/auth/login').send({ email, password: 'wrongpass' });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/invalid/i);
});

it('should return 400 for login with non-existent email', async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: 'notfound@example.com',
    password: 'irrelevant',
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/invalid/i);
});

});
