import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';

import '../app.css';
import './setscreens.css';
function CardPair({term, def}){
	return(
	<div className ="cardpair">
		<div className ="card"><input type= "text" placeholder= {term} className = 'inputline' /></div>
		<div className ="card"><input type= "text" placeholder= {def} className = 'inputline' /><button className ="btn btn-primary"><b>x</b></button></div>
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

export function EditSet(){
	const params = useParams();
	const setId=parseInt(params.setid);
	const [cSet, setcSet] = React.useState(new FlashcardSet(setId)); 
	const [wTitle, setWTitle] = React.useState('Loading...');
	async function setupSet(){
		setcSet(await getSet(setId,setWTitle));
	}
	setupSet();
	[isPrivate, setIsPrivate] = React.useState(true);
	[cardText, setCardText] = React.useState('');
	[setName, setSetName] = React.useState('');
	return (
		<div className = 'main'>
			<div className ="pagespace spagespace">		
				<h1> 
					<input type= "text" id="setname" placeholder="Flashcard Set Name"className = 'inputline' />
				</h1>
				{/*<div className ="cardlist">
					<CardPair term='ab' def='cd' />
					<CardPair term='term' def='definition' />
				</div>*/}
				input 
			</div>
			<div className ="sidebar">
				<label for="privatecheck">private set?</label>
				<input type="checkbox" id="isprivate" name="privatecheck" checked={isPrivate} className = "form-check-input" onChange={(e)=>{setIsPrivate(!isPrivate)}}/>
				<button className ="btn btn-primary"> add row </button>
				<button className ="btn btn-primary"> save changes </button>
				<NavLink to = '/cardset/5'><button className ="btn btn-primary">save & study</button></NavLink>
			</div>
		</div>
		);
}