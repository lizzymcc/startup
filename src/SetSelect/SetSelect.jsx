import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import placeholdersets from '../setdata/placeholdersets.json';
import '../app.css';
function SetDisp(props){
	console.log(props);
	return(
		<div className = "setdisp">
			<h3>
				<NavLink to= {`/cardset/${props.set.id}`}>
					{props.set.title}
				</NavLink>
			</h3>
			<p>{props.set.cards.length} cards - id:{props.set.id} last studied mm/dd/yyyy</p>
		</div>
	)
}
export function SetSelect() {
	const setlist = placeholdersets.sets;
	return(
		<div className = 'main'>
			<div className = 'sidebar'> 
				<NavLink to='/cardset/edit/5'><button className='btn btn-primary'>New Set</button></NavLink>
			</div>
			<div className = 'pagespace'>
				<div className = 'setlist'>
					{setlist.map((s)=><SetDisp set={s}/>)}
				</div>
			</div>
		</div>
	);
};