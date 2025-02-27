import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';


export function PlayBox(props){ //props: ENDSCREEN: endscreen (bool),  onRestart, onClickScoresLink(?), time... we might just want to make the endscreen a different object. askfordef setting (bool), card, onSuccess, onFail,
	const card = props.card;
	/*if (props.endscreen) {
		return(
			<div className = 'playbox'>
			<div> 
				<h3> Set complete!</h3>
			</div>
			<div>
				Your time: [to be included]
				<button className = "btn btn-primary" onClick={}>submit</button>
			</div>
		</div>
		);
	}*/
	function checkMatch(string1, goal){
		return (string1.toUpperCase() === goal.toUpperCase()); //ignore case
				//other things we might want to add later: ignore punctuation? Ignore things in brackets? for now we'll just do this
	}
	const [tresp, setTresp] = React.useState('');
	function respChange(e) {
		setTresp(e.target.value);
	}
	function checkResp(e){
		if (checkMatch(tresp, (props.askForDef ? (card.def) : (card.term)))){
			setTresp('');
			props.onSuccess();
		} else {
			setTresp('');
			props.onFail();
		}
	}
	function checkEnter(e){
		if (e.key === "Enter"){
			document.getElementById("submit").click;
		}
	}
	return(
		<div className = 'playbox'>
		<div> 
			<h3> {props.askForDef ? (card.term) : (card.def)}</h3>
		</div>
		<div>
			<input type="text" value ={tresp} className ="inputline" onChange={respChange} onKeyDown={checkEnter}/>
			<button id="submit" className = "btn btn-primary" onClick={checkResp}>submit</button>
		</div>
	</div>
	);
}