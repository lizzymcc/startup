import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import placeholdersets from '../placeholdersets.json';

import '../app.css';
import './setscreens.css';
function CardPair({term, def}){
	return(
		<div className = 'cardpair'>
			<div className = 'card'>
				{term}
			</div>
			<div className ="card">
				{def}
			</div>
		</div>
	);
	
}
export function CardSet(props){
	const setId = useParams();
	return (
		<div className = 'main'>
			<div className = 'sidebar'>
				<NavLink to= {`/play/${setId}`} > <button className ='btn btn-primary'>play</button> </NavLink>
				<NavLink to = {`/cardset/edit/${setId}`}><button className ="btn btn-primary">edit cards</button></NavLink>
				<NavLink to = '/cardset/edit/6'><button className ="btn btn-primary">copy set</button></NavLink>
				<NavLink to={`/scores/${setId}`}><button className ="btn btn-primary">high scores</button></NavLink>

			</div>
			<div className = 'pagespace spagespace'>
				<div className = 'cardlist'>
					<h1> Cards: </h1>
					<CardPair term='ab' def='cd' />
					<CardPair term='ij' def='kl' />
					<CardPair term='ef' def='gh' />
				</div>
			</div>
		</div>
	);
}