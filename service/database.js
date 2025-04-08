const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('user');
const use_history = db.collection('use_history');
const scoreCollection = db.collection('high_scores');
//const cardpairCollection = db.collection('card_pair');
const setCollection = db.collection('flashcard_set');

userCollection.createIndex({uname:1},{unique:true});
setCollection.createIndex({id:1},{unique:true});
scoreCollection.createIndex({setid:1, user:1});


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
	await db.command({ ping: 1 });
	//console.log(`Connect to database`);
  } catch (ex) {
	//console.log(`Unable to connect to database with ${url} because ${ex.message}`);
	process.exit(1);
  }
})();

//user stuff, largely based on the simon-db example. 

function getUserN(val) {
	return userCollection.findOne({ uname: val });

}
function getUserT(val) {
	return userCollection.findOne({ token: val });
}

async function updateUser(user) {
	const t = await userCollection.updateOne({ uname: user.uname }, { $set: {password: user.password, token: user.token} });
	//console.log("t: ",t);
	return t;
}

async function addUser(user) {
	//console.log("user: ", user);
	const t = await userCollection.insertOne(user);

	//console.log("adding user result: ", t);
	return t;
	//console.log("addUser error: ", error.errorResponse);
	return null;
}
async function clearUsers() {
	await userCollection.deleteMany();
	return 1;
}
async function removeUser(un) {
	const t = await userCollection.deleteOne({uname:un});
	return t;
}




//SETS
async function getSet(id) {
	const t = await setCollection.findOne({ id: id });
	return t;
}
async function getPublicSet(id) {
	return setCollection.findOne({id: id, privateset: false});
}

async function getPublicSets(){
	const c = await setCollection.aggregate([{$match: {privateset: false}}, {$project: {"_id":false}}]);
	const t = await c.toArray();
	//console.log("cursor: ", c, ", array: ", t);
	return t;
}
async function getVisibleSets(uname){
	const c = await setCollection.aggregate([{$match: {$or: [{privateset: false},{creating_user: uname}]}}, {$project: {"_id":false}}]);
	const t = await c.toArray();
	//console.log("cursor: ", c, ", array: ", t);
	return t;
}
async function addSet(set){
	const t = await setCollection.insertOne(set);
	//console.log("t: ",t);
	return (t ? t.insertedId : null);
}
async function getSetCount(){
	const t = await setCollection.countDocuments();
	//console.log("getting set count...");
	return t;
}
async function getMaxId(){
	let maxid = 0;
	const t = await setCollection.aggregate([
			{
				$group: {_id: null, maxid:{$max: "$id"}}
			}]).toArray();
	return (t[0].maxid);
}
async function clearSets(){
	await setCollection.deleteMany();
	return 1;
}
async function removeSet(id, usercheck){
	const t = await setCollection.deleteOne({id: id, creating_user: usercheck});
	const c = await scoreCollection.deleteMany({setid: id});
	return t;
}
async function updateSet(inset, usercheck){ 
	const t = await setCollection.updateOne({id: inset.id, creating_user: usercheck}, { $set: {cards:inset.cards, title:inset.title, privateset:inset.privateset} });
	return t;
}

async function getScoresForSet(setid){
	const t = await scoreCollection.find({setid:setid}).sort({score : 1}).toArray();
	return (t ? t.map((i)=>({player:i.user, seconds:i.score})) : null);
}

async function getScore(setid, uname){
	const t = await scoreCollection.findOne({ setid: setid, user:uname});
	return (t ? t.score : null);
}

async function updateScore(setid, uname, score){
	const t = await scoreCollection.updateOne({setid: setid, user: uname}, { $set: {score: score} });
	return t;
}

async function addScore(setid, uname, score) {
	const t =await scoreCollection.insertOne({setid: setid, user: uname, score: score});
	return t;
}

async function clearScores() {
	const t = await scoreCollection.deleteMany();
	return t;
}


module.exports = {
	getUserN,
	getUserT,
	addUser,
	updateUser,
	clearUsers,
	removeUser,
	getSet,
	addSet,
	getPublicSets,
	getVisibleSets,
	getSetCount,
	getMaxId,
	clearSets,
	removeSet,
	updateSet,
	addScore,
	getScore,
	updateScore,
	getScoresForSet,
	clearScores,
  };