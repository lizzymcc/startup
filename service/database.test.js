const request = require('supertest');
const app = require('./index');
const DB = require('./database');

test('add user & get user by username', async () =>{
	DB.addUser({})
});
test('add user & get user by token', async () =>{

});
test('update user & get user by username', async () =>{

});
test('user', async () => {
	const email = 'test@email.com';
	const password = 'toomanysecrets';
	const register = await request(app).post('/api/auth').send({ uname, password });
  
	expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
	expect(register.body).toMatchObject({ email });
  });
  