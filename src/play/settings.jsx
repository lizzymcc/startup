import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';

import '../app.css';
export function Settings(props){
	return(
	<div id="overlay">				
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
				<input type="radio" id="askT" name="qa" value={false} onChange={props.opt1(target.value)}/>
				<label for="askT">term</label>
				<input type="radio" checked= {props.opt1} id="askD" name="qa" value={true} onChange={props.opt1(target.value)}/>
				<label for="askD">definition</label>
			</fieldset>
			<div className = "settingsq">
				<label for="sunsetOn">Allow sunrise/sunset notifications for your area?</label>
				<input type="checkbox" id="sunsetOn" name="sunsetOn" className = "form-check-input"/>
			</div>
		</div>
	</div>);
}