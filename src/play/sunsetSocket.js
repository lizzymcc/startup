class SunCall {
	constructor(isRise, time) {
		this.isRise = isRise;
		this.time = time;
	} //do we need anything with the socket id? Idk
}

class SunsetSocket {
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
	broadcastCall(isRise, time) {
		const sc = new SunCall(isRise, time);
		this.socket.send(JSON.stringify(sc));
	}
	recieveCall(call) {
		handler(call);
	}
}
export {SunCall, SunsetSocket };