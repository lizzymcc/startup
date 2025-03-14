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
export function EditSet(){
	[isPrivate, setIsPrivate] = React.useState[false];
	props.spt("Edit set (possibly not gonna get used)");
	props.sbt(`/cardset/${setId}`);
	return (
		<div className = 'main'>
			<div className ="pagespace spagespace">		
				<h1> 
					<input type= "text" id="setname" placeholder="Flashcard Set Name"className = 'inputline' />
				</h1>
				<div className ="cardlist">
					<CardPair term='ab' def='cd' />
					<CardPair term='term' def='definition' />
				</div>
			</div>
			<div className ="sidebar">
				<label for="privatecheck">private set?</label>
				<input type="checkbox" id="sunsetOn" name="privatecheck" checked={isPrivate} className = "form-check-input" onChange={(e)=>{setIsPrivate(!isPrivate)}}/>
				<button className ="btn btn-primary"> add row </button>
				<button className ="btn btn-primary"> save changes </button>
				<NavLink to = '/cardset/5'><button className ="btn btn-primary">save & study</button></NavLink>

			</div>
		</div>
		);
}