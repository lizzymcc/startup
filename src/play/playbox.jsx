import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';

export function PlayBox(props){
	return(
		<div className = 'playbox'>
		<div> 
			<h3> [term]</h3>
		</div>
		<div>
			<input type="text" placeholder="enter definition" className ="inputline"/>
			<button className = "btn btn-primary">submit</button>
		</div>
	</div>
	);
}