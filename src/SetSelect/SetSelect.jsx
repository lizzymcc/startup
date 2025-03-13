import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import '../app.css';
function SetDisp(props){
	//console.log(props);
	return(
		<div className = "setdisp">
			<h3>
				<NavLink to= {`/cardset/${props.set.id}`}>
					{props.set.title}
				</NavLink>
			</h3>
			<p>{props.set.cards.length} cards - owner: {props.set.creating_user} {props.set.privateset ? '- 🔒':''}</p>
		</div>
	)
}
async function getSets(errm){
	const response = await fetch('/api/sets/visible',{
		method: 'get',
	  }
	);
    if (response?.status === 200) {
		const respobj = await response.json();
		return respobj.sets;
    } else {
		console.log("response: ", response);
      const body = await response.json();
      errm(`⚠ Error: ${body.msg}`);
    }
   //console.log(placeholdersets.sets);
   //return placeholdersets.sets;

}


export function SetSelect(props) {
	props.spt("Set Select");
	const [errmsg, setMessage] = React.useState('no errors yet...');
	const [setlist, setSetlist] = React.useState([]);
	async function getlistworking(){
		setSetlist(await getSets(setMessage));
	};
	getlistworking();
	return(
		<div className = 'main'>
			<div className = 'sidebar'> 
				{errmsg}
				{/*<NavLink to='/cardset/edit/5'><button className='btn btn-primary'>New Set</button></NavLink>*/}
			</div>
			<div className = 'setlist'>
				{setlist.map((s)=><SetDisp set={s}/>)}
			</div>
		</div>
	);
};