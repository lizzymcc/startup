const request = require('supertest');
const app = require('./index');

test('register simple', async () => {
	const uname = 'test1';
	const password = 'toomanysecrets';
	const register = await request(app).post('/api/auth').send({ uname, password });
  
	expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
	expect(register.body).toMatchObject({ uname });
  });
  