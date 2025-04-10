const { WebSocketServer } = require('ws');
class SunCall {
	constructor(isRise, time) {
		this.isRise = isRise;
		this.time = time;
	}
}
function wsServer(httpServer){
	console.log("httpServer: ", httpServer);
	const socketServer = new WebSocketServer({ server: httpServer });
	console.log("socketServer: ",socketServer);
	//const clients = new Clients();
	socketServer.on('connection', (socket)=> {
		socket.hasTime = false;
		socket.time = 0;
		socket.isRise = true;
		console.log("new connection's socket: ", socket);
		//socketServer.clients.add(socket);
		socket.isAlive = true;
		socket.on('message', function message(data) {
			const msgd = JSON.parse(String.fromCharCode(...data));
			console.log("socket just got a message: ", msgd);
			socket.hasTime = true;
			socket.time = new Date(msgd.time);
			socket.isRise = msgd.isRise;
		});
		
		socket.on('pong', () => {
			socket.isAlive = true;
			//console.log("hastime: ", socket.hasTime, "time: ", socket.time);
		});
		//ping/pong function should run on an interval
			//so if the interval is smalle nough, we can probably just use that for the notification? like test the time against the one it's supposed to notify on and send it if it's after that point.
			//
	});
	function getTimeDiff(targettime){
		let c = new Date(Date.now());
		return targettime - c;
	}
	function parseTimeDifference(milliseconds){
		let c = new Date(milliseconds);
		return `${c.getUTCHours()}:${c.getUTCMinutes()}`;
	}
	//console.log("on connection thing set up");
	setInterval(() => {
		//console.log("client list: ", socketServer.clients);
		socketServer.clients.forEach(function each(client) {
			console.log("client:", client);
			if (client.hasTime){
				if (getTimeDiff(client.time) <= 900000){
					client.hasTime = false;
					client.send(JSON.stringify(new SunCall(client.isRise, client.time)));
				}
			}
			if (client.isAlive === false) return client.terminate();
			client.isAlive = false;
			client.ping();
		});
	  }, 10000);
}
module.exports = {wsServer};