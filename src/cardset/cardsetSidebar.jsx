import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';

import '../app.css';
import './setscreens.css';
import { AuthState } from '../login/authState';

export function CardsetSidebar(props){

	const setId = props.cSet.id;
	const isSignedIn = (localStorage.getItem("userName"));
	const isOwner = false; //(localStorage.getItem("userName") === props.cSet.creating_user);

	return(
		<div className = 'sidebar'>
			<NavLink to= {`/play/${setId}`} > <button className ='btn btn-primary'>play</button> </NavLink>
			{isOwner ? (<NavLink to = {`/cardset/edit/${setId}`}><button className ="btn btn-primary">edit cards</button></NavLink>) : (null)}
			{false ? (<NavLink to = '/cardset/edit/6'><button className ="btn btn-primary">copy set</button></NavLink>) : (null)}
			<NavLink to={`/scores/${setId}`}><button className ="btn btn-primary">high scores</button></NavLink>

		</div>
	);
}