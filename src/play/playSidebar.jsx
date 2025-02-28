import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import { Settings } from './settings';
import { SunsetNotifier } from './sunsetNotifier';
import '../app.css';
export function PlaySidebar(props){
	console.log("sidebar runtime: ", props.runtime);
	return(
		<div className = 'sidebar'>
			<div className = "sidebartext score">
				<p>words left: {props.cardsleft} of {props.totalcards}, 
					time: {Math.floor(props.runtime/60)}:{String(Math.floor(props.runtime % 60)).padStart(2,0)}</p>
			</div>
			<SunsetNotifier show={props.sunv}/>
			<div className = 'twobuttons'>
				<button className ="btn btn-primary" onClick ={props.setbutton}>
					<img src="/gear.svg" alt="settings logo" height='15pc' />
				</button>
				<div className = 'restartbutton'>
					<button className ="btn btn-primary" onClick ={props.rsbtn}>restart</button>
				</div>
			</div>				
		</div>
	);
}