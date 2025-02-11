import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import '../app.css';

export function Play(){
	return(
		<div className = 'main'>

		<div className = 'sidebar'>
			<div className = "sidebartext score">
				<p>words left: 3 of 12, time: 5:01, rank: 15</p>
			</div>

			<div className = "sidebartext sunsetnotes">
				<p> 5:33 pm - The sun is setting in your area!</p>
			</div>
			<div className = 'twobuttons'>
				<button className ="btn btn-primary" onclick = "document.getElementById('overlay').style.display = 'flex'">
					<img src="/gear.svg" alt="settings logo" height='15pc' />
				</button>
				<div className = 'restartbutton'>
					<button className ="btn btn-primary">restart</button>
				</div>
			</div>				

		</div>
		<div className = 'pagespace'>
			<div className = 'playbox'>
				<div> 
					<h3> [term]</h3>
				</div>
				<div>
					<input type="text" placeholder="enter definition" className ="inputline"/>
					<button className = "btn btn-primary">submit</button>
				</div>
			</div>
		</div>
	</div>
	);
}