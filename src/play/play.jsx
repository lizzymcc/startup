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
		errm(null);
		return respobj;
	} else {
		const body = await response.json();
		errm(`Error: ${body.msg}`);
		return(new FlashcardSet(setId))
	}
}
async function addScore(id,seconds){
	const response = await fetch('/api/scores',{
		method: 'put',
		body: JSON.stringify({setid: id, seconds: seconds}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }
	);
	if (response?.status === 200) {
		const respobj = await response.json();
		console.log("high score updated!");
		return respobj;
	} else {
		const body = await response.json();
		console.log(`Error: ${body.msg}`);
	}
}

function PlayIsolater(props){
	//console.log("props: ", props);
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
	const [score, setScore] = React.useState(-1);
	React.useEffect(() => {
		if (score > -1){
			addScore(props.cSet.id,score);
			/*let hs = (parseInt(localStorage.getItem(`${props.uname} hs ${props.cSet.id}`)) || score+1);
			if (hs > score){

				localStorage.setItem(`${props.uname} hs ${props.cSet.id}`,score);
			}*/
		}
	},[score]);
	if (props.errm){
		return(		<div className = 'main'>
<h1>{props.errm}</h1>
</div>);
	}
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
	const [errm, seterrm] = React.useState("Loading...");
	const [cSet, setcset] = React.useState(new FlashcardSet(0,'','',false,[{term:errm, def:errm}]));
	async function setupCset(){
		setcset(await getSet(setId,seterrm));
	}
	setupCset();
	//console.log("cset in outer function: ", cSet);
	props.spt("Practice");
	props.sbt(`/cardset/${setId}`);

	return (<PlayIsolater cSet={cSet} uname={uname} errm={errm}/>);
}