import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholdersets from '../setdata/placeholdersets.json';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import { Settings } from './settings';
import { PlayBox } from './playbox';
import { PlaySidebar } from './playSidebar';
import { PlayGame } from './playGame';
import '../app.css';


export function Play(props){
	const params = useParams();
	const setId=parseInt(params.setid);
	const cSet = placeholdersets.sets.find(c=>(c.id===setId));

	const [svis, setSvis]=React.useState(false); //settings visibility
	const [askForDef, setAskForDef] = React.useState(true); //settings


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
		<PlayGame cSet={cSet} askForDef={askForDef}/>
	</div>
	);
}