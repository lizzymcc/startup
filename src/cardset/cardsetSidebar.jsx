import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';

import '../app.css';
import './setscreens.css';

export function CardsetSidebar(props){

	const setId = props.cSet.id;
	const isSignedIn = (localStorage.getItem("userName") === props.cSet.creating_user);
	const isOwner = (localStorage.getItem("userName") === props.cSet.creating_user);

	return(
		<div className = 'sidebar'>
			<NavLink to= {`/play/${setId}`} > <button className ='btn btn-primary'>play</button> </NavLink>
			{<NavLink to = {`/cardset/edit/${setId}`}><button className ="btn btn-primary">edit cards</button></NavLink>}
			<NavLink to = '/cardset/edit/6'><button className ="btn btn-primary">copy set</button></NavLink>
			<NavLink to={`/scores/${setId}`}><button className ="btn btn-primary">high scores</button></NavLink>

		</div>
	);
}