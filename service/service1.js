const placeholdersets= require('./placeholdersets.json');
const placeholderscoredata = require('./placeholderscoredata.json');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
//copying code from the authtest index...
const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());
/*app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
  });*/
app.use(express.json());
app.use(express.static('public'));
const users = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);
//endpoints:

//LOGIN/USERS: /api/auth, /api/user
//again, we're going to copy the code from the authtest for now, with some edits...

function setAuthCookie(res, user) {
  user.token = uuid.v4();

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
  };

  users.push(user);

  return user;
}
function getUser(field, value) {
  if (value) {
	return users.find((user) => user[field] === value);
  }
  return null;
}
// registration
apiRouter.post('/auth', async (req, res) => {
  if (await getUser('uname', req.body.uname)) {
	res.status(409).send({msg: 'Existing user'});
  } else {
	const user = await createUser(req.body.uname, req.body.password);
	setAuthCookie(res, user);
	res.send({ uname: user.uname });
  }
});
// login
apiRouter.put('/auth', async (req, res) => {
	const user = await getUser('uname', req.body.uname);
	if (user && (await bcrypt.compare(req.body.password, user.password))) {
	  setAuthCookie(res, user);
	  res.send({ uname: user.uname });
	} else {
	  res.status(401).send({ msg: 'Unauthorized' });
	}
  });
// logout
apiRouter.delete('/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
	clearAuthCookie(res, user);
  }

  res.send({});
});

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie('token');
}

// getMe
apiRouter.get('/user/me', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
	  res.send({ uname: user.uname });
	} else {
	  res.status(401).send({ msg: 'Unauthorized' });
	}
  });

const sets = placeholdersets.sets;
const scoredata = placeholderscoredata.scores;

function getPublicSets() {
	return sets.filter(item => !item.privateset);
}
function getVisibleSets(uname){
	return sets.filter(item => (!item.privateset || item.creating_user === uname));
}
function gsbi(sid){
	return sets.findIndex((c)=>(c.id===sid));
}
function getScoresIndex(sid){
	return scoredata.findIndex((c)=>(c.setid===sid));
}
//SCORES: /api/scores
//get high scores from a cardset
//POST /api/scores (request body includes cardset id)\
apiRouter.post('/scores', async (req, res) => { 
	const scores = scoredata[getScoresIndex(req.body.setid)];
	if (scores){
		res.send(scores);
	} else {
		res.status(400).send({msg: "no scores for this cardset"});
	}
  });



function getScore(uname, sid){
	let c = scoredata[getScoresIndex(sid)];
	if (c){
		return c.highscores.find((d)=>(d.player === uname)) || null;
	} else {
		return null;
	}
}
//get user's score for a cardset (or if they don't have one)
//POST /api/scores/me (request body includes cardset id)
apiRouter.post('/scores/me', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
		const score = await getScore(user.uname, req.body.setid);
		if (score){
			res.send(score);
		} else {
			res.status(400).send({msg: "no user score for this cardset"});
		}
	} else {
		res.status(401).send({msg: "cannot add a score without a username"});
	}
  });

//add or update user's high score
//PUT /api/scores (request body includes cardset id ) -- if 
apiRouter.put('/scores', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const s=req.body.seconds;
	const scoreindex = await getScoresIndex(req.body.setid);
	if (user && scoreindex > -1 && scoredata[scoreindex].highscores){
		const u = user.uname;
		const score = await getScore(u, req.body.setid);
		if (score){
			if (score.seconds > s){
				scoredata[scoreindex].highscores.find((d)=>(d.player === u)).seconds = s;
			}
		} else {
			scoredata[scoreindex].highscores.push({player:u, seconds:s});
		}
		res.send(getScore(u, req.body.setid));
	} else {
		res.status(401).send({msg: "cannot add a score without a username"});

	}
  });




//CARDS: /api/sets, /api/cards (?)

//get cardsets that the current user can see (public cardsets + private cardsets whose username matches the user):
//GET /api/sets/visible (request body(?) includes user id or lack thereof)
apiRouter.get('/sets/visible', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	if (user) {
	  res.send({sets: getVisibleSets(user.uname)});
	} else {
	  res.send({sets: getPublicSets()});
	}
  });
function addSet(cards, isprivate, title, uname){
	let newid = Math.max(sets.map((i)=>(i.id))) + 1;
	const newset = {
		id: newid, 
		title: title,
		creating_user: uname, 
		privateset: isprivate, 
		cards: cards,
	};
	const newscores = {
		setid:newid,
		highscores:[],
	};
	sets.push(newset);
	scoredata.push(newscores);
	return newset;
}
//get cards for a given cardset ID (?) actually just get all the set info, only the cards is kinda useless
//POST /api/set (the set vs sets is the thing that distinguishes this from the set creation which feels. unideal but we'll see)
apiRouter.post('/set', async (req, res) => { //ofc in the full version we want to code this so that private sets that arent authorized can't be accessed from this endpoint but that's more something to do once we get into databases -- 
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const setgot = sets[gsbi(req.body.setid)];
	if (setgot){
		if (!setgot.privateset || (user && user.uname === setgot.creating_user)){
			res.send(setgot);
		} else {
			res.status(401).send({msg: "not authorized to access this cardset\n(how did you even get here)"});
		}
	} else {
		res.status(400).send({msg: "card set does not exist"});
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
		res.send(addSet(cards,ispriv,title,user.uname));
	} else {			
		res.status(401).send({ msg: 'cannot create or edit sets without logging in' });
	}
	});

	
	//edit cardset 
	//PUT /api/sets (request body includes cardset id), PUT /api/sets
apiRouter.put('/sets', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const setnum = gsbi(req.body.setid);
	const cards = req.body.cards;
	const ispriv = req.body.priv;
	const title = req.body.title;
	if (user && setnum) {
		if (sets[setnum].creating_user === user.uname){
			sets[setnum].cards = cards;
			sets[setnum].title = title;
			sets[setnum].privateset = ispriv;
			res.send(sets[setnum]);
			
		} else {
			res.status(401).send({ msg: 'not authorized to edit this set' });

		}
	} else {			
		res.status(401).send({ msg: 'cannot create or edit sets without logging in' });
	}
	});

	//remove cardset
apiRouter.delete('/sets', async (req, res) => {
	const token = req.cookies['token'];
	const user = await getUser('token', token);
	const setnum = gsbi(req.body.setid);
	if (user && setnum) {
		if (sets[setnum].creating_user === user.uname){
			sets = [...sets.slice(0,setnum), ...sets.slice(setnum+1)];
			res.send(sets);
		} else {
			res.status(401).send({ msg: 'not authorized to edit this set' });

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

  module.exports=app;