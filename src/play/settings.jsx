import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';

import '../app.css';
export function Settings(props){
	function updateAfd (e) {
		console.log(e.target.value);
		props.opt1((e.target.value > 0));
	}
	if (props.show){
		return(
			<div id="overlay">				
				<div className = 'settingsform'>
					<div className = 'overlaytitle'>
						<div className ='backbutton'>
							<a onClick = {props.hideFunc}>
								<img src = '/backbutton.png' alt="back" height="30px"/>
							</a>
						</div>
						<h2> Settings </h2>
					</div>
					<fieldset className = "settingsq">
						<h4>Ask for:</h4>
						<input type="radio" id="askT" name="qa" checked={!props.afd} value={0} onChange={updateAfd} />
						<label for="askT">term</label>
						<input type="radio" id="askD" name="qa" checked={props.afd} value={1} onChange={updateAfd}/>
						<label for="askD">definition</label>
					</fieldset>
					<div className = "settingsq">
						<label for="sunsetOn">Allow sunrise/sunset notifications for your area?</label>
						<input type="checkbox" id="sunsetOn" name="sunsetOn" className = "form-check-input"/>
					</div>
				</div>
			</div>
		);
	}
	else {
		return null;
	}
}