import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
//import placeholdersets from '../setdata/placeholdersets.json';
import { FlashcardSet } from '../FlashcardSet'
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
async function getSet(id,errm){
	const response = await fetch('/api/set',{
		method: 'post',
		body: JSON.stringify({setid: id}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }
	);
    if (response?.status === 200) {
		const respobj = await response.json();
		errm('Cards:');
		return respobj;
    } else {
		const body = await response.json();
		errm(`Error: ${body.msg}`);
		return(new FlashcardSet(setId))
    }
}
export function CardSet(props){	

	const params = useParams();
	const setId=parseInt(params.setid);
	const [cSet, setcSet] = React.useState(new FlashcardSet(setId)); 
	const [wTitle, setWTitle] = React.useState('Loading...');
	async function setupSet(){
		setcSet(await getSet(setId,setWTitle));
	}
	setupSet();
	props.spt(cSet.title);
	props.sbt('/');
	return (
		<div className = 'main'>
			<CardsetSidebar cSet={cSet} authState={props.authState}/>
			<div className = 'pagespace spagespace'>
				<div className = 'cardlist'>
					<h1> {wTitle} </h1>
					{cSet.cards.map((c)=><CardPair term={c.term} def={c.def}/>)}
				</div>
			</div> 
		</div>
	);
}