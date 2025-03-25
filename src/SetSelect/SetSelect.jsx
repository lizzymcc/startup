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
		errm(null);
		//console.log("respobj.sets: ", respobj.sets);
		return respobj;
    } else {
		console.log("response: ", response);
		const body = await response.json();
		console.log(`errm: ${body.msg}`);
		errm(`⚠ Error: ${body.msg}`);
		return null;
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
function SetSelectIsolater(props){
	const [sl, setSL] = React.useState([]);
	React.useEffect(()=>{
		setSL(props.setlist.sets);
		console.log("setting sl to ", sl);
	}, [props.setlist]);
	/*if (props.errm){
		return(		
		<div className = 'main'>
			<h1>{props.errm}</h1>
		</div>);
	}*/
	return(
		<div className = 'main'>
			<div className = 'sidebar'> 
				{/*<button className='btn btn-primary' onClick={newSetButton}>New Set</button>*/}
			</div>
			<div className = 'setlist'>
				{sl.map((s)=><SetDisp set={s}/>)}
			</div>
		</div>
	);
}
export function SetSelect(props) {
	const [errmsg, setMessage] = React.useState(null);
	const [setlist, setSetlist] = React.useState({sets: []});

	React.useEffect(()=>{
		async function getlistworking(){
			const t = await getSets(setMessage);
			setSetlist(t);
		}
		getlistworking();},[props.loginTrigger]);
	props.spt("Set Select");
	return(<SetSelectIsolater setlist={setlist} errm={errmsg}/>);

};