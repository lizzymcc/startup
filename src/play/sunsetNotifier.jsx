import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';



  
export function SunsetNotifier(props){
	const [locationEnabled, setLE] = React.useState(false);
	const [sunsetnotes, setSN] = React.useState('');
	const [uLocation, setUL] = React.useState(null);
	const [timeNow, setTimeNow] = React.useState(Date.now());
	const [sunrise, setSunRise] = React.useState(null);
	const [sunset, setSunSet] = React.useState(null);
	function handlePermission() {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
		  if (result.state === "granted") {
			report(result.state);
			navigator.geolocation.getCurrentPosition(
				(position)=>{setUL(position.coords);}, (error)=>{console.error("error getting location", error);}
			);
		} else if (result.state === "prompt") {
			report(result.state);
			navigator.geolocation.getCurrentPosition(
				(position)=>{setUL(position.coords);}, (error)=>{console.error("error getting location", error);}
			);
		  } else if (result.state === "denied") {
			report(result.state);
			setLE(false);
			setUL(null);
		  }
		  result.addEventListener("change", () => {
			report(result.state);
		  });
		});
	}
	
	function report(state) {
	console.log(`Permission ${state}`);
	}
	async function getSunsetTime(){
		const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${uLocation.latitude}&lng=${uLocation.longitude}&formatted=0`,{
			method: 'get',
		  }
		);
		if (response?.status === 200) {
			console.log("response: ", response);
			const respobj = await response.json();
			console.log("respobj: ",respobj);
			return respobj.results;
		} else {
			console.log("response: ", response);
		  const body = await response.json();
		}
	}

	function updateSunTimes(){
		console.log("location enabled?:",locationEnabled, "uLocation: ", uLocation);
		if(uLocation){
			getSunsetTime().then((result)=>{
				setSunRise(new Date(result.sunrise));
				setSunSet(new Date(result.sunset));
				console.log("results: ", result);
			});
			//setSN(`latitude: ${uLocation.latitude}, longitude: ${uLocation.longitude}`);
		} else {
			setSN('Location not enabled');
		}
	}
	function updateSN(){
		if(uLocation && sunrise && sunset){
			let c = new Date(Date.now());
			const opts = {
				hour: "numeric",
				minute: "numeric",
				second: "false"
			};
			if (Math.abs(sunrise - c) < (1000 * 60 * 30)){
				setSN(`${c.toLocaleTimeString(opts)} - the sun may be rising in your area`);
			} else if (Math.abs(sunset - c) < (1000 * 60 * 30)){
				setSN(`${c.toLocaleTimeString(opts)} - the sun may be setting in your area`);
			} else {
				//setSN('');
				setSN(`time now: ${c.toLocaleTimeString(opts)}, sunrise: ${sunrise.toLocaleTimeString(opts)}, sunset: ${sunset.toLocaleTimeString(opts)}`);
			}
		}
	}
	React.useEffect(handlePermission,[props.show]);
	React.useEffect(updateSunTimes,[locationEnabled, uLocation, props.show]);
	React.useEffect(updateSN,[props.timechecker]);
	if (props.show){	
		return(			
			<div className = "sidebartext sunsetnotes">
				<p>{sunsetnotes}</p>
			</div>
		);	
	} else {
		return null;
	}

}