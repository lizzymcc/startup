const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

const use_history = db.collection('use_history');
const hsCollection = db.collection('high_scores');
//const cardpairCollection = db.collection('card_pair');
const setCollection = db.collection('flashcard_set');

userCollection.createIndex({user:1},{unique:true});
setCollection.createIndex({id:1},{unique:true});

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
	await db.command({ ping: 1 });
	console.log(`Connect to database`);
  } catch (ex) {
	console.log(`Unable to connect to database with ${url} because ${ex.message}`);
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
  await userCollection.updateOne({ uname: user.uname }, { $set: user });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}




//SETS
async function getSet(id) {
	return setCollection.findOne({ id: id });
}

async function getPublicSets(){
	const c = await setCollection.find({privateset: false});
	const t = await c.toArray();
	//console.log("cursor: ", c, ", array: ", t);
	return t;
}
async function getVisibleSets(uname){
	const t = await setCollection.find({$or: [{privateset: false},{uname: uname}]}).toArray();
	console.log("t: ", t);
	return t;
}
async function addSet(set){
	const t = await setCollection.insertOne(set);
	console.log("t: ",t);
	return t.insertedId;
}
async function getSetCount(){
	const t = await setCollection.countDocuments();
	console.log("getting set count...");
	return t;
}
async function getMaxId(){
	let maxid = 0;
	const t = await db.runCommand({
		aggregate: "flashcard_set",
		pipeline: [
			{
				$project: {maxId: {$max: $id}}
			}
		]

	});
}
module.exports = {
	getUserN,
	getUserT,
	addUser,
	updateUser,
	getSet,
	addSet,
	getPublicSets,
	getVisibleSets,
	getSetCount,
	getMaxId,
	//addScore,
	//getHighScores,
  };