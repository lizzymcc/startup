
class sunsetSocket {
	constructor() {
		let port = window.location.port;
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
		this.socket.onmessage = async (msg) => {
			try {
				const msgtext = await msg.data.text();
				console.log(msgtext);
			} catch {} 
		}
	}
}