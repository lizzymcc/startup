import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholdersets from '../setdata/placeholdersets.json';
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';
import { PlayBox } from './playbox';

export function PlayGame({cSet, askForDef, updateRem, resetTimer, clearRuntime, restartNote, getTime, setScore}){
	const [qc, setqc] = React.useState([]);
	const [qcIndex, setqci] = React.useState(0);
	const [rounds, setRounds] = React.useState(0);
	const[complete, setComplete] = React.useState(false);
	const [failedlast, setFailedLast] = React.useState(false);
	let card = qc[qcIndex];
	const nav = useNavigate();
	React.useEffect(()=>{
		if (qcIndex >= qc.length){
			setqci(0);
		};
	}, [qcIndex, qc]);
	React.useEffect(()=>{
		updateRem(qc.length)}, [qc]);

	React.useEffect(()=>{
		onReStart();
	},[]);

	React.useEffect(onReStart, [askForDef, restartNote]);
	function onReStart(){
		setqc(cSet.cards.sort( () => Math.random() - 0.5));
		setqci(0);
		setRounds(0);
		setComplete(false);
		setFailedLast(false);
		resetTimer(()=>Date.now());
		clearRuntime(0);
		setScore(-1);


	}
	function onComplete(){
		//let c = getTime();
		setScore(getTime);
		//console.log('complete!');

		setComplete(true);
	}
	function onSuccess(){
		if (qc.length === 1){
			onComplete();
		}
		setqc([...qc.slice(0,qcIndex), ...qc.slice(qcIndex+1)]);
		//console.log("success, qcl: ", qc.length);
		//removes the item from the list and then goes to the next one, or the first one if we're going back to the beginning.
	}
	function onFail(){
		setFailedLast(true);

	}
	function onRetry(){
		setqci((qcIndex+1) % qc.length);
		setFailedLast(false);
	}

	function succeed(e){
		if (failedlast){
			onRetry();
		}
		else {
			onSuccess();
		}
	}

	if (complete) {
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
		//console.log('qc: ', qc, 'qcl: ', qc.length, 'qci: ', qcIndex)
		return(
			<div className = 'pagespace'>
				<PlayBox card ={qc[qcIndex] || {"term": "error", "def": "oops"}} askForDef = {askForDef} onSuccess={succeed} onFail={(e)=>onFail()} showhint={failedlast}/>
			</div>

		);
	}
	
}
