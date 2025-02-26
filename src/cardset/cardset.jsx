import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';
import { CardsetSidebar } from './cardsetSidebar';

import '../app.css';
import './setscreens.css';
function CardPair(props){
	return(
		<div className = 'cardpair'>
			<div className = 'card'>
				{props.term}
			</div>
			<div className ="card">
				{props.def}
			</div>
		</div>
	);
	
}
export function CardSet(props){
	const params = useParams();
	const setId=parseInt(params.setid);
	const cSet = placeholdersets.sets.find(c=>(c.id===setId));
	{props.changetitle(cSet.title)};	
	return (
		<div className = 'main'>
			<CardsetSidebar cSet={cSet} authState={props.authState}/>
			<div className = 'pagespace spagespace'>
				<div className = 'cardlist'>
					<h1> Cards: </h1>
					{cSet.cards.map((c)=><CardPair term={c.term} def={c.def}/>)}
				</div>
			</div>
		</div>
	);
}