
const request = require('supertest');
const app = require('./service');
test ('get visible sets', async () => {
	const register = await request(app).get('/api/sets/visible');
	const c = register.body;
	console.log("c: ", c);
	expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
	expect(c.sets.length).toBe(3);
});
/*test('register simple', async () => {
	const uname = 'test1';
	const password = 'toomanysecrets';
	const register = await request(app).post('/api/auth').send({ uname: uname, password:password });
  
	expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
	expect(register.body).toMatchObject({ uname });
  });*/
  