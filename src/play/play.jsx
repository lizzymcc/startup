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


export function Play(props){
	const params = useParams();
	const setId=parseInt(params.setid);
	const cSet = placeholdersets.sets.find(c=>(c.id===setId));

	console.log(cSet.cards.length);
	const [svis, setSvis]=React.useState(false); //settings visibility
	const [askForDef, setAskForDef] = React.useState(true); //settings
	
	console.log(cSet.cards);
	const [totalCards, setCardNum] = React.useState(cSet.cards.length || 0);
	const [cardsLeft, setCardsLeft] = React.useState(totalCards);
	const [starttime, setStartTime] = React.useState(Date.now());
	const [runtime, setTime] = React.useState(0);
	const [restartNote, setRN] = React.useState(true);
	return(
		<div className = 'main'>
			<Timer updateTime={setTime} startTime={starttime}/>
			<Settings show={svis} afd ={askForDef} opt1 = {setAskForDef} hideFunc={(e)=>{setSvis(false)}}/>
			<PlaySidebar setbutton={(e)=>setSvis(true)} totalcards={totalCards} cardsleft = {cardsLeft} runtime={runtime} rsbtn={()=>setRN(!restartNote)}/>
			<PlayGame cSet={cSet} askForDef={askForDef} updateRem={setCardsLeft} resetTimer={setStartTime} clearRuntime={setTime} restartNote={restartNote}/>
		</div>
	);
}