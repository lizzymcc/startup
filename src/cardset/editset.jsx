import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';

import '../app.css';
import './setscreens.css';
function CardPair(props){
	
}
function EditCardPair(props){
	const [tTerm, setTterm] = React.useState(props.term);
	const [tDef, setTdef] = React.useState(props.def);
	const textChangeTerm = React.useCallback((e)=>{
		setTterm(e.target.value);
	}, []);
	const textChangeDef = React.useCallback((e)=>{
		setTdef(e.target.value);
	}, []);
	function updatePair(){
		props.setCard({term: tTerm, def: tDef});
	}
	return(
		<div className ="cardpair">
			<div className ="card">
				<input type= "text" className = 'inputline' value={tTerm} onChange={textChangeTerm} onFocusOut={updatePair}/>
			</div>
			<div className ="card">
				<input type= "text" className = 'inputline' value= {tDef}  onChange={textChangeDef} onFocusOut={updatePair}/>
				<button className ="btn btn-primary" onClick={props.delThis}>
					<b>x</b>
				</button>
			</div>
		</div>
	);
}

/*async function getSet(id,errm){
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
}*/
async function saveSet(cards, ispriv, title, setid=null){
	if (setid) {

	} else {
		const response = await fetch('/api/sets',{
			method: 'post',
			body: JSON.stringify({cards: cards, priv: ispriv, title: title}),
			headers: {
			  'Content-type': 'application/json; charset=UTF-8',
			},
		  }
		);
		if (response?.status === 200) {
			console.log(response);
			return 1;
		} else {
			const body = await response.json();
			errm(`Error: ${body.msg}`);
			return(body);
		}
	}
}
function EditingCardList(props){
	props.setCLO();
	return (
		<div className ="cardlist">
			<CardPair term='ab' def='cd' />
			<CardPair term='term' def='definition' />
		</div>
	);
}
export function EditSet(props){ //ONLY DOING SET CREATION FOR NOW, we'll maybe see what we can do with editing existing sets
	//const params = useParams();
	//const setId=parseInt(params.setid); 
	[isPrivate, setIsPrivate] = React.useState(true);
	[setName, setSetName] = React.useState('');
	[cardListObj, setCardListObj] = React.useState('');
	return (
		<div className = 'main'>
			<div className ="pagespace spagespace">		
				<h1> 
					<input type= "text" id="setname" placeholder="Flashcard Set Name"className = 'inputline' />
				</h1>
				
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