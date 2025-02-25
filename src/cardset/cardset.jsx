import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';

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
	console.log(params);
	console.log(params.setid);
	const setId=params.setid;
	const cSet = placeholdersets.sets.find(c=>(c.id=setId));
	console.log(cSet);
	console.log(cSet.cards);
	{props.changetitle(cSet.title)};
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
					{cSet.cards.map((c)=><CardPair term={c.term} def={c.def}/>)}
				</div>
			</div>
		</div>
	);
}