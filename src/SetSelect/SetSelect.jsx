import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
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
			<p>{props.set.cards.length} cards - owner: {props.set.creating_user} {props.set.privateset ? '- 🔒':''}</p>
		</div>
	)
}
async function getSets(errm){
	console.log("getting sets...");
	const response = await fetch('/api/sets/visible',{
		method: 'get',
	  }
	);
    if (response?.status === 200) {
		console.log("response: ", response);
		const respobj = await response.json();
		console.log("respobj.sets: ", respobj.sets);
		return respobj.sets;
    } else {
		console.log("response: ", response);
      const body = await response.json();
	  console.log(`errm: ${body.msg}`);
      errm(`⚠ Error: ${body.msg}`);
    }
   //console.log(placeholdersets.sets);
   //return placeholdersets.sets;

}
/*async function createSet(){
	const response = await fetch('/api/sets',{
		method: 'post',
		cards: [],
		isPrivate: true,
		title:'untitled'
	  }
	);
    if (response?.status === 200) {
		console.log("")
		const respobj = await response.json();
		return respobj.id;
    } else {
		console.log("response: ", response);
      const body = await response.json();
	  console.log(`errm: ${body.msg}`);
      errm(`⚠ Error: ${body.msg}`);
    }
}
async function newSetButton(){
	const navigate = useNavigate();
	const setId = await createSet();
	navigate(`/cardset/edit/${setId}`);
}*/

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
				{/*<button className='btn btn-primary' onClick={newSetButton}>New Set</button>*/}
			</div>
			<div className = 'setlist'>
				{setlist.map((s)=><SetDisp set={s}/>)}
			</div>
		</div>
	);
};