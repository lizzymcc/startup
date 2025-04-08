const { WebSocketServer } = require('ws');

function wsServer(httpServer){
	const socketServer = new WebSocketServer({ server: httpServer });

	socketServer.on('connection', (socket )=> {
		socket.isAlive = true;
		console.log("new connection, socket: ", socket);
		console.log("all clients: ", socketServer.clients);
		//when recieving a message, the message should have:
			// - a timestamp of the time at which to send the notification
			// - some way to determine which socket to send the thing to, which is the socket that this is on. Something like the checking if it's alive thing in peerproxy
			// is there a way to give the socket attributes besides the builtin ones like isAlive? Need to look into this.
				//looks like probably not. Hm. Also how do we parse message data?
		socket.on('message', function message(data) {
			console.log("socket just got a message, data: ", data);
		});
		
		//ping/pong function should run on an interval
			//so if the interval is smalle nough, we can probably just use that for the notification? like test the time against the one it's supposed to notify on and send it if it's after that point.
			//
		socket.on('pong', () => {
			socket.isAlive = true;
		});
	});
	setInterval(() => {
		socketServer.clients.forEach(function each(client) {
		  if (client.isAlive === false) return client.terminate();
	
		  client.isAlive = false;
		  client.ping();
		});
	  }, 10000);
}
module.exports = {wsServer};