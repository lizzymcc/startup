import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';


export function PlayBox(props){ //props: ENDSCREEN: endscreen (bool),  onRestart, onClickScoresLink(?), time... we might just want to make the endscreen a different object. askfordef setting (bool), card, onSuccess, onFail,

	const card = props.card;
	function checkMatch(string1, goal){
		return (string1.toUpperCase() === goal.toUpperCase()); //ignore case
				//other things we might want to add later: ignore punctuation? Ignore things in brackets? for now we'll just do this
	}
	const [tresp, setTresp] = React.useState('');
	const [isRetaking, setIR] = React.useState(false);
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
		//console.log("key pressed: ", e.key);
		if (e.key === "Enter"){
			document.getElementById("submit").click();
		}
	}
	function Hint(){
		if (props.showhint){
		return(<div className="hint"> Try again! Correct answer: <span className="hint2"> {(props.askForDef ? (card.def) : (card.term))}</span>
			</div>);
		}
	}
	return(
		<div>
			<div className = 'playbox'>
				<div> 
					<h3> {props.askForDef ? (card.term) : (card.def)}</h3>
				</div>
				<div>
					<input type="text" value ={tresp} className ="inputline" onChange={respChange} onKeyDown={checkEnter}/>
					<button id="submit" className = "btn btn-primary" onClick={checkResp}>submit</button>
				</div>
			</div>
			<Hint />
		</div>
	);
}