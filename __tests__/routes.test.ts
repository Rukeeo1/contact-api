import request from 'supertest';
import app from '../src/routes/api';

describe('Api Routes', () => {
  test('/home returns hello world', () => {
    return request(app)
      .get('/api/home')
      .expect(200, { data: 'Hello World' });
  });
});
