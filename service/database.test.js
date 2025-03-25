const request = require('supertest');
//const app = require('./index');
const DB = require('./database');
const placeholdersets= require('./placeholdersets.json');
async function setTestUser(){
	DB.clearUsers();
	const user = {
		uname: "abc",
		password: "testing testing 1 2 3",
		token: "idk"
	};
	let c = 0;
	try {
		c = await DB.addUser(user);
	} catch (error) {
		expect(error.errorResponse.code).toBe(11000);
		try {
			c = await DB.updateUser(user);
		} catch (e2) {
			console.log("updateUser error: ", e2.errorResponse);
		};
	};
	return 1;
}
async function setupBasicSets(){
	await DB.clearSets();
	placeholdersets.sets.forEach(async (i)=>{
		await DB.addSet(i);
	});
	return 1;
}
test('get user by username', async () =>{
	await setTestUser();
	let t = await DB.getUserN("abc");
	expect(t.password).toBe("testing testing 1 2 3");
	expect(t.token).toBe("idk");
});
test('get user by token', async () =>{
	let t = await DB.getUserT("idk");
	expect(t.password).toBe("testing testing 1 2 3");
	expect(t.uname).toBe("abc");
});

test('remove a user', async () => {
	await DB.removeUser('abc');
	const t = await DB.getUserN('abc');
	expect(t).toBe(null);
});
test('add users in sequence', async () =>{
	const user1 = {
		uname: "abc",
		password: "testing testing 1 2 3",
		token: "idk"
	};
	const user2 = {
		uname: "moo",
		password: "testing testing 1 5 4",
		token: "tired"
	};
	try {
		await DB.addUser(user1);
	} catch (exp) {
		console.log("re-adding abc error: ", exp);
		expect(exp).toBe('re-adding the recently deleted user abc');
	}
	try {
		await DB.addUser(user1);
	} catch (exp) {
		//console.log("double-adding abc error: ", exp);
		expect(exp.errorResponse.code).toBe(11000);
		//expect(exp).toBe('doubling up on abc so we can see what the error message for doubles is supposed to be');
	}
	const t = await DB.getUserN(user1.uname);
	expect(t.password).toBe(user1.password);

	try {
		await DB.addUser(user2);
	} catch (exp) {
		console.log("adding moo error: ", exp);
		expect(exp).toBe('adding a completely new user');
	}
	const c = await DB.getUserN(user2.uname);
	expect(c.password).toBe(user2.password);


})
test("removing a user's token", async () => {
	const user2 = {
		uname: "moo",
		password: "testing testing 1 5 4",
		token: "tired"
	};
	delete user2.token;
	await DB.updateUser(user2);
	const t = await DB.getUserN(user2.uname);
	expect(t.password).toBe(user2.password);
	if (t.token){
		expect(t.token).toBe("the token shouldn't be here so let's see what it is");
	}

})



test('get setCount', async () => {
	await setupBasicSets();
	let t = await DB.getSetCount();
	expect(t).toBe(4);
})
test('get max setId', async () =>{
	const t = await DB.getMaxId();
	expect(t).toBe(5040);
});
function getSIL(t){
	let c = t.map((i)=>i.id);
	c.sort((a,b)=>a-b);
	//console.log("c: ",c);
	return c;
}
test('get public sets', async() =>{
	const t = await DB.getPublicSets();	
	expect(getSIL(t)).toEqual([ 5030, 5038, 5039 ]);
});
test ('get visible sets', async() => {
	const t1 = await DB.getPublicSets();
	const t2 = await DB.getVisibleSets("no one");
	const t3 = await DB.getVisibleSets("lizzym");
	expect(getSIL(t1)).toEqual(getSIL(t2));
	expect(t2.length).toBe(3);
	expect(t3.length).toBe(4);
});
test('get cards from a set', async() => {
	const t = await DB.getSet(5039);
	expect(t.cards.length).toBe(4);
});

test('add scores to the database & get them from a set', async () => {
	await DB.clearScores();
	await DB.addScore(5039, 'abc', 15);
	await DB.addScore(5039, 'def', 5);
	await DB.addScore(5039, 'player5', 8);
	await DB.addScore(5039, 'player6', 6);
	await DB.addScore(5039, 'player7', 80);
	await DB.addScore(5038, 'player6', 93);
	const t = await DB.getScore(5039,'def');
	expect(t).toBe(5);
	const c = await DB.getScore(5038, 'player6');
	expect(c).toBe(93);
});
test('get scores in order from a set', async () => {
	const t = await DB.getScoresForSet(5039);
	expect(t.map((i)=>i.player)).toEqual(['def','player6','player5','abc','player7']);
})

test('update a score', async() => {
	await DB.updateScore(5039, 'player7', 12);
	const t = await DB.getScoresForSet(5039);
	expect(t.map((i)=>i.player)).toEqual(['def','player6','player5','player7','abc']);
	const c = await DB.getScore(5039,'player7');
	expect(c).toBe(12);
});


/*test('user', async () => {
	const email = 'test@email.com';
	const password = 'toomanysecrets';
	const register = await request(app).post('/api/auth').send({ uname, password });
  
	expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
	expect(register.body).toMatchObject({ email });
  });*/
  