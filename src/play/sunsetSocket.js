class SunCall {
	constructor(isRise, time) {
		this.isRise = isRise;
		this.time = time;
	} //do we need anything with the socket id? Idk
}

class SunsetSocketThing {
	constructor() {
		let port = window.location.port;
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
		this.handler = (e) => {console.log("default handler recieving: ", e);}
		this.socket.onmessage = async (msg) => {
			try {
				const msgtext = JSON.parse(await msg.data.text());
				console.log(msgtext);
			} catch {} 
		}
	}
	setHandler(handler) {
		this.handler = handler;
	}
	broadcastCall(call) {
		//const sc = new SunCall(isRise, time);
		//console.log("broadcasting ", call);
		this.socket.send(JSON.stringify(call));
	}
	recieveCall(call) {
		handler(call);
	}
}

const SunsetSocket = new SunsetSocketThing();
export {SunCall, SunsetSocket };