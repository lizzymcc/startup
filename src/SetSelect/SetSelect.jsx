import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import placeholdersets from '../placeholdersets.json';
import '../app.css';
function SetDisp(props){
	return(
		<div className = "setdisp">
			<h3>
				<NavLink to= {`/cardset/${props.set.id}`}>
					{props.set.title}
				</NavLink>
			</h3>
			<p>[{props.set.cards.length}] cards - last studied mm/dd/yyyy</p>
		</div>
	)
}
export function SetSelect() {
	const setlist = placeholdersets.sets;
	const idlist = ['a', 'b', 'c', 'd5', 'e','5102'];
	return(
		<div className = 'main'>
			<div className = 'sidebar'> 
				<NavLink to='/cardset/edit/5'><button className='btn btn-primary'>New Set</button></NavLink>
			</div>
			<div className = 'pagespace'>
				<div className = 'setlist'>
					{setlist.map((id)=><SetDisp set={id}/>)}
				</div>
			</div>
		</div>
	);
};