import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import '../app.css';
function SetDisp(props){
	return(
		<div className = "setdisp">
			<h3>
				<NavLink to= {`/cardset/${props.setid}`}>
					set title goes here
				</NavLink>
			</h3>
			<p>[#] cards - last studied mm/dd/yyyy</p>
		</div>
	)
}
export function SetSelect() {
	const idlist = ['a', 'b', 'c', 'd5', 'e','5102'];
	return(
		<div className = 'main'>
			<div className = 'sidebar'> 
				<NavLink to='/cardset/edit/5'><button className='btn btn-primary'>New Set</button></NavLink>
			</div>
			<div className = 'pagespace'>
				<div className = 'setlist'>
					{idlist.map((id)=><SetDisp setid={id}/>)}
				</div>
			</div>
		</div>
	);
};