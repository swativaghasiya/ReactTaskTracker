const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

describe('Auth Middleware', () => {
  it('should return 401 if no token is provided', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    authMiddleware(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should call next if token is valid', () => {
    const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });
});
