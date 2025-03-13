import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholdersets from '../setdata/placeholdersets.json';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import { Settings } from './settings';
import { PlayBox } from './playbox';
import { PlaySidebar } from './playSidebar';
import { PlayGame } from './playGame';
import {Timer} from './timer';
import '../app.css';
import { FlashcardSet } from '../FlashcardSet';
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

function PlayIsolater(props){
	console.log("props: ", props);
	//console.log(props.cSet.cards.length);
	const [svis, setSvis]=React.useState(false); //settings visibility
	const [askForDef, setAskForDef] = React.useState(true); //settings
	const [sunvis, setSunvis]=React.useState(false);

	//console.log(props.cSet.cards);

	const [totalCards, setCardNum] = React.useState(props.cSet.cards.length || 0);
	const [cardsLeft, setCardsLeft] = React.useState(totalCards);
	const [starttime, setStartTime] = React.useState(Date.now());
	const [runtime, setTime] = React.useState(0);
	const [restartNote, setRN] = React.useState(true);
	const [score, setScore] = React.useState(0);
	React.useEffect(() => {
		if (score > -1){
			let hs = (parseInt(localStorage.getItem(`${props.uname} hs ${props.cSet.id}`)) || score+1);
			if (hs > score){
				localStorage.setItem(`${props.uname} hs ${props.cSet.id}`,score);
			}
		}
	},[score]);
	return(
		<div className = 'main'>
			<Timer updateTime={setTime} startTime={starttime}/>
			<Settings show={svis} afd ={askForDef} opt1 = {setAskForDef} hideFunc={(e)=>{setSvis(false)}} 
				 sunv={sunvis} opt2={setSunvis}/>
			<PlaySidebar setbutton={(e)=>setSvis(true)} totalcards={totalCards} 
				cardsleft = {cardsLeft} runtime={(score > -1) ? (score) : (runtime)} 
				rsbtn={()=>setRN(!restartNote)} sunv={sunvis}/>
			<PlayGame cSet={props.cSet} askForDef={askForDef} updateRem={setCardsLeft} 
				resetTimer={setStartTime} clearRuntime={setTime} restartNote={restartNote}
				setScore={setScore} getTime={runtime} updateTot={setCardNum}/>
		</div>
	);
}
export function Play(props){
	const [uname, setUserName] = React.useState(localStorage.getItem('userName') || '');
	const params = useParams();
	const setId=parseInt(params.setid);
	const [cSet, setcset] = React.useState(new FlashcardSet(0));
	async function setupCset(){
		setcset(await getSet(setId,(e)=>console.log(e)));
	}
	setupCset();
	console.log("cset in outer function: ", cSet);
	props.spt("Practice");
	props.sbt(`/cardset/${setId}`);

	return (<PlayIsolater cSet={cSet} uname={uname}/>);
}