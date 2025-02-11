import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import '../app.css';

function SettingsOverlay(){
	return(<div id="overlay">				
		<div className = 'settingsform'>
			<div className = 'overlaytitle'>
				<div className ='backbutton'>
					<a onclick = "document.getElementById('overlay').style.display = 'none'">
						<img src = 'backbutton.png' alt="back" height="30px"/>
					</a>
				</div>
				<h2> Settings </h2>
			</div>
			<fieldset className = "settingsq">
				<h4>Ask for:</h4>
				<input type="radio" id="askT" name="qa" value="askT"/>
				<label for="askT">term</label>
				<input type="radio" checked="checked" id="askD" name="qa" value="askD"/>
				<label for="askD">definition</label>
			</fieldset>
			<div className = "settingsq">
				<label for="sunsetOn">Allow sunrise/sunset notifications for your area?</label>
				<input type="checkbox" id="sunsetOn" name="sunsetOn" className = "form-check-input"/>
			</div>
		</div>
	</div>);
}
export function Play(){
	return(
		<div className = 'main'>
		<SettingsOverlay />
		<div className = 'sidebar'>
			<div className = "sidebartext score">
				<p>words left: 3 of 12, time: 5:01, rank: 15</p>
			</div>

			<div className = "sidebartext sunsetnotes">
				<p> 5:33 pm - The sun is setting in your area!</p>
			</div>
			<div className = 'twobuttons'>
				<button className ="btn btn-primary" onclick = "document.getElementById('overlay').style.display = 'block'">
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