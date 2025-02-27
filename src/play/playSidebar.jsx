import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import { Settings } from './settings';
import { SunsetNotifier } from './sunsetNotifier';
import '../app.css';
export function PlaySidebar(props){
	return(
		<div className = 'sidebar'>
			<div className = "sidebartext score">
				<p>words left: 3 of 12, time: 5:01, rank: 15</p>
			</div>
			<SunsetNotifier show={true}/>
			<div className = 'twobuttons'>
				<button className ="btn btn-primary" onClick ={props.setbutton}>
					<img src="/gear.svg" alt="settings logo" height='15pc' />
				</button>
				<div className = 'restartbutton'>
					<button className ="btn btn-primary">restart</button>
				</div>
			</div>				
		</div>
	);
}