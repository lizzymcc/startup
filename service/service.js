const placeholdersets = require('./placeholdersets.json');
const placeholderscoredata = require('./placeholderscoredata.json');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
//copying code from the authtest index...
const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
//const users = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);
//endpoints:

//LOGIN/USERS: /api/auth, /api/user
//again, we're going to copy the code from the authtest for now, with some edits...

function setAuthCookie(res, user) {
	res.cookie('token', user.token, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
}
async function createUser(uname, password) {
	const passwordHash = await bcrypt.hash(password, 10);
	const user = {
		uname: uname,
		password: passwordHash,
		token: uuid.v4(),
	};
	await DB.addUser(user);
	return user;
}

function getUser(field, value) {
	if (value) {
		if (field === 'uname') {
			return DB.getUserN(value);
		} else {
			return DB.getUserT(value);
		}
	}
	return null;
}

// registration - DB X
apiRouter.post('/auth', async (req, res) => {
	if (await getUser('uname', req.body.uname)) {
		res.status(409).send({ msg: 'Existing user' });
	} else {
		try {
			const user = await createUser(req.body.uname, req.body.password);
			setAuthCookie(res, user);
		} catch (exp) {
			if (exp.errorResponse.code === 11000){
				res.status(409).send({ msg: 'Existing user' });
			} else {
				res.status(409).send( {msg: exp.message});
			}
			return 0;
		}
		res.send({ uname: req.body.uname });
	}
});

// login - DB X
apiRouter.put('/auth', async (req, res) => {
	const user = await getUser('uname', req.body.uname);
	if (user && (await bcrypt.compare(req.body.password, user.password))) {
		try {
			user.token = uuid.v4();
			await DB.updateUser(user)
			setAuthCookie(res, user);
			res.send({ uname: user.uname });
		} catch (exp) {
			res.status(401).send({msg: exp.message});
		}

	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
});
//DB X
async function clearAuthCookie(res, user) {
	delete user.token;
	await DB.updateUser(user);
	res.clearCookie('token');
}
// logout DB X
apiRouter.delete('/auth', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		await clearAuthCookie(res, user);
		res.status(204).send();
	} else {
		res.status(404).send({msg:"token not attachedcd to any user"});
	}
});



// getMe -- DB up to date I'm pretty sure
apiRouter.get('/user/me', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		res.send({ uname: user.uname });
	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
});

const psets = placeholdersets.sets;
const scoredata = placeholderscoredata.scores;

async function getPublicSets() {
	return DB.getPublicSets();
	//return sets.filter(item => !item.privateset);
}
async function getVisibleSets(uname) {
	return DB.getVisibleSets(uname);
	//return sets.filter(item => (!item.privateset || item.creating_user === uname));
}

/*function getScoresIndex(sid) {
	return scoredata.findIndex((c) => (c.setid === sid));
}*/
//SCORES: /api/scores
//get high scores from a cardset
//POST /api/scores (request body includes cardset id)\
apiRouter.post('/scores', async (req, res) => {
	const scores = await DB.getScoresForSet(req.body.setid);
	if (scores) {
		res.send(scores);
	} else {
		res.status(400).send({ msg: "no scores for this cardset" });
	}
});



async function getScore(uname, sid) {
	const c = await DB.getScore(sid, uname);
	return c; 
}
//get user's score for a cardset (or if they don't have one)
//POST /api/scores/me (request body includes cardset id)
apiRouter.post('/scores/me', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		const score = await getScore(user.uname, req.body.setid);
		if (score) {
			res.send({player: user.uname, seconds:score});
		} else {
			res.status(400).send({ msg: "no user score for this cardset" });
		}
	} else {
		res.status(401).send({ msg: "cannot add a score without a username" });
	}
});

//add or update user's high score
//PUT /api/scores (request body includes cardset id ) -- if 
apiRouter.put('/scores', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const s = req.body.seconds;
	const sid = req.body.setid;
	if (user) {
		const u = user.uname;
		const score = await getScore(u, sid);
		if (score) {
			if (score.seconds > s) {
				await DB.updateScore(sid,u,s);
			}
		} else {
			await DB.addScore(sid,u,s);
		}
		res.send(getScore(u, sid));
	} else {
		res.status(401).send({ msg: "cannot add a score without a username" });

	}
});




//CARDS: /api/sets, /api/cards (?)

//get cardsets that the current user can see (public cardsets + private cardsets whose username matches the user):
//GET /api/sets/visible (request body(?) includes user id or lack thereof)
apiRouter.get('/sets/visible', async (req, res) => {
	/*const t = await DB.getSetCount();
	console.log("set count: ",t);
	if (t < 1){
		psets.forEach((i)=>{
			addSet(i.cards, i.privateset, i.title, i.creating_user);
		});
	}*/
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		const c = await getVisibleSets(user.uname);
		res.send({ sets: c });
	} else {
		const c = await getPublicSets();
		res.send({ sets: c });
	}
});

async function addSet(cards, isprivate, title, uname) {
	let newid = 0;
	try {
		newid = await DB.getMaxId();
	} catch (err) {
		newid = 1;
	}
	const newset = {
		id: newid + 1,
		title: title,
		creating_user: uname,
		privateset: isprivate,
		cards: cards,
	};
	//let newid= await DB.addSet(newset);
	//newset.id = newid;
	const t = await DB.addSet(newset);

	/*const newscores = {
		setid:newid,
		highscores:[],
	};*/
	//scoredata.push(newscores);
	return newset;
}
//get cards for a given cardset ID (?) actually just get all the set info, only the cards is kinda useless
//POST /api/set (the set vs sets is the thing that distinguishes this from the set creation which feels. unideal but we'll see)
apiRouter.post('/set', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const setgot = await DB.getSet(req.body.setid);
	if (setgot && setgot != null) {
		if (!setgot.privateset || (user && user.uname === setgot.creating_user)) {
			res.send(setgot);
		} else {
			res.status(401).send({ msg: "not authorized to access this cardset\n(how did you even get here)" });
		}
	} else {
		res.status(400).send({ msg: "card set does not exist" });
	}
}); //ok this is less of a priority than...
//IF DOING EDITING/ADDING FROM THE USER END: (all of the edits will require a verification that the user is the owner)

//create new cardset (initialization data is in the body of the set)
//POST /api/sets (UNUSED) (for now)
apiRouter.post('/sets', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const cards = req.body.cards;
	const ispriv = req.body.priv;
	const title = req.body.title;
	if (user) {
		c = await addSet(cards, ispriv, title, user.uname);
		res.send(c);
	} else {
		res.status(401).send({ msg: 'cannot create or edit sets without logging in' });
	}
});


//edit cardset 
//PUT /api/sets (request body includes cardset id), PUT /api/sets (UNUSED)
apiRouter.put('/sets', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const setnum = gsbi(req.body.setid);
	const newset = {
		id: req.body.setid,
		cards: req.body.cards,
		title: req.body.title,
		privateset: req.body.priv
	}

	if (user) {
		const t = await DB.updateSet(newset, user.uname);
		if (t) {
			res.send(t);
		} else {
			res.status(401).send({ msg: 'set does not exist, or you are not authorized to edit this set' });

		}
	} else {
		res.status(401).send({ msg: 'cannot create or edit sets without logging in' });
	}
});

//remove cardset
apiRouter.delete('/sets', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		try {
			const t = await DB.removeSet(req.body.setid, user.uname);
			res.send(t);
		} catch (exp) {
			res.status(401).send({ msg: `exception thrown when trying to remove set, error: ${exp.body}` });
		}
	} else {
		res.status(401).send({ msg: 'cannot create or edit sets without logging in' });
	}
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
	const user = await findUser('token', req.cookies["token"]);
	if (user) {
		next();
	} else {
		res.status(401).send({ msg: 'Unauthorized' });
	}
};
app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
});

// Default error handler
app.use(function (err, req, res, next) {
	res.status(500).send({ type: err.name, message: err.message });
});

/*app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});*/

module.exports = app;