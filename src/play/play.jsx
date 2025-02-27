import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import { Settings } from './settings';
import { PlayBox } from './playbox';
import { SunsetNotifier } from './sunsetNotifier';
import { PlaySidebar } from './playSidebar';
import '../app.css';


export function Play(){
	const setId = useParams();
	const [svis, setSvis]=React.useState(false); 
	const [askForDef, setAskForDef] = React.useState(true);
	const [successmarker, setSuccessMarker] = React.useState('unanswered');
	function MarkSuccess(succeeded){
		if (succeeded){
			console.log('success!');
		}
		else {
			console.log('incorrect!');
		}
	}
	return(
		<div className = 'main'>
		<Settings show={svis} opt1 = {setAskForDef} hideFunc={(e)=>{setSvis(false)}}/>
		<PlaySidebar setbutton={(e)=>setSvis(true)}/>
		<div className = 'pagespace'>
			<PlayBox term = "termtest" def = "deftest" askForDef = {askForDef} onSuccess={(e)=>MarkSuccess(true)} onFail={(e)=>MarkSuccess(false)}/>
		</div>
	</div>
	);
}