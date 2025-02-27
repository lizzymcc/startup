import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholdersets from '../setdata/placeholdersets.json';
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';
import { PlayBox } from './playbox';

export function PlayGame({cSet, askForDef}){
	const cardcount=cSet.cards.length;
	const [qc, setqc] = React.useState(cSet.cards.sort( () => Math.random() - 0.5));
	const [qcIndex, setqci] = React.useState(0);
	const [rounds, setRounds] = React.useState(0);
	const[complete, setComplete] = React.useState(false);
	const nav = useNavigate();
	function onReStart(){
		setqc(cSet.cards.sort( () => Math.random() - 0.5));
		setqci(0);
		setRounds(0);
		setComplete(false);
		//reset timer
	}
	function onComplete(){
		console.log('complete!');
		setComplete(true);
	}
	function onSuccess(){
		setqc([...qc.slice(0,qcIndex), ...qc.slice(qcIndex+1)]);
		console.log("success, qcl: ", qc.length);
		if (qc.length < 1) {
			onComplete();
		}
		if (qcIndex >= qc.length){
			setqci(0);
			setRounds(rounds+1);
		}
		//removes the item from the list and then goes to the next one, or the first one if we're going back to the beginning.
	}
	function onFail()
	{
		//display correct answer somehow (might put this in playbox code)
		console.log("qci before incremented: ", qcIndex);
		let t = qcIndex + 1;
		if (t >= qc.length){
			setqci(0);
			setRounds(rounds+1);
		}
		else {
			setqci(t);
		}
		console.log("fail, qcl: ", qc.length, "t: ", t, "qci: ", qcIndex);

	}
	if (qc.length <= 0) {
		return(
			<div className = 'pagespace'>
				<div className = 'playbox'>
					<div> 
						<h3>Complete! </h3>
					</div>
					<div>
						<button className = "btn btn-primary" onClick={onReStart}>try again</button>
						<button className = "btn btn-primary" onClick={e=>nav(`/scores/${cSet.id}`)}>view high scores</button>
					</div>
				</div>
			</div>
		);
	} else {
		console.log('qc: ', qc, 'qcl: ', qc.length, 'qci: ', qcIndex)
		return(
			<div className = 'pagespace'>
				<PlayBox card ={(qc[qcIndex]) || {"term": "error", "def": "oops"}} askForDef = {askForDef} onSuccess={(e)=>onSuccess()} onFail={(e)=>onFail()}/>

			</div>
		);
	}
	
}
