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
	const [uname, setUserName] = React.useState(localStorage.getItem('userName') || '');
	const params = useParams();
	const setId=parseInt(params.setid);
	const cSet = placeholdersets.sets.find(c=>(c.id===setId));

	//console.log(cSet.cards.length);
	const [svis, setSvis]=React.useState(false); //settings visibility
	const [askForDef, setAskForDef] = React.useState(true); //settings
	const [sunvis, setSunvis]=React.useState(false);

	props.spt("Practice");
	props.sbt(`/cardset/${setId}`);
	//console.log(cSet.cards);

	const [totalCards, setCardNum] = React.useState(cSet.cards.length || 0);
	const [cardsLeft, setCardsLeft] = React.useState(totalCards);
	const [starttime, setStartTime] = React.useState(Date.now());
	const [runtime, setTime] = React.useState(0);
	const [restartNote, setRN] = React.useState(true);
	const [score, setScore] = React.useState(0);
	React.useEffect(() => {
		if (score > -1){
			let hs = (parseInt(localStorage.getItem(`${uname} hs ${cSet.id}`)) || score+1);
			if (hs > score){
				localStorage.setItem(`${uname} hs ${cSet.id}`,score);
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
			<PlayGame cSet={cSet} askForDef={askForDef} updateRem={setCardsLeft} 
				resetTimer={setStartTime} clearRuntime={setTime} restartNote={restartNote}
				setScore={setScore} getTime={runtime}/>
		</div>
	);
}