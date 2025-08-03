const request = require('supertest');
const app = require('../app');
const setupTestDB = require('./setupTestDB');

let token;
let createdTaskId;
let mongoServer;

beforeAll(async () => {
  mongoServer = await setupTestDB();
  const res = await request(app).post('/api/auth/signup').send({
    email: 'tasker@example.com',
    password: 'taskpass'
  });
  token = res.body.token;
});

afterAll(async () => {
  await setupTestDB.stop(mongoServer);
});

describe('Task Routes', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Test Task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('My Test Task');
    createdTaskId = res.body._id;
  });

  it('should fetch all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('My Test Task');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task');
    expect(res.body.completed).toBe(true);
  });

  it('should delete the task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
  it('should return 400 if task title is missing', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${token}`)
    .send({ dueDate: '2025-08-02' });

  expect(res.statusCode).toBe(400); // Add this logic in controller to validate
});

it('should return 404 for task not found by ID', async () => {
  const fakeId = '64cfd6e0f2b9d9fcd028f9a1';
  const res = await request(app)
    .get(`/api/tasks/${fakeId}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toMatch(/failed to load/i);
});

it('should return 404 for updating non-existent task', async () => {
  const fakeId = '64cfd6e0f2b9d9fcd028f9a1';
  const res = await request(app)
    .put(`/api/tasks/${fakeId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ title: 'Non-existent' });

  expect(res.statusCode).toBe(404);
});

it('should return 404 for deleting non-existent task', async () => {
  const fakeId = '64cfd6e0f2b9d9fcd028f9a1';
  const res = await request(app)
    .delete(`/api/tasks/${fakeId}`)
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toBe(404);
});

});
