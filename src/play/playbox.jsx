import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';


export function PlayBox(props){
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
		if (checkMatch(tresp, (props.askForDef ? (props.def) : (props.term)))){
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
			<h3> {props.askForDef ? (props.term) : (props.def)}</h3>
		</div>
		<div>
			<input type="text" value ={tresp} className ="inputline" onChange={respChange} onKeyDown={checkEnter}/>
			<button id="submit" className = "btn btn-primary" onClick={checkResp}>submit</button>
		</div>
	</div>
	);
}