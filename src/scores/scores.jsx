import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import '../app.css';
import './scorescreen.css';
import placeholderscores from '../setdata/placeholderscoredata';

function ScoreRow(props = {place:'0', user:'loading',time:'0:00'}){
	return(
		<tr>
			<td>{props.place}</td>
			<td>{props.user}</td>
			<td>{props.time}</td>
		</tr>
	);
}
async function getScores(setId){
	const response = await fetch('/api/scores',{
		method: 'post',
		body: JSON.stringify({setid: setId}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }
	);
	if (response?.status === 200) {
		//console.log("response: ", response);
		const respobj = await response.json();
		//console.log("respobj: ", respobj);
		return respobj;
	} else {
		//console.log("response: ", response);
		const body = await response.json();
		//console.log(`Error: ${body.msg}`);
		return [];
	}
}
async function getPersonalScore(setId){
	const response = await fetch('/api/scores/me',{
		method: 'post',
		body: JSON.stringify({setid: setId}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }
	);
	if (response?.status === 200) {
		//console.log("response: ", response);
		const respobj = await response.json();
		//console.log("personal score respobj: ", respobj);
		return respobj.seconds;
	} else {
		//console.log("response: ", response);
		const body = await response.json();
		//console.log(`Error: ${body.msg}`);
		return null;
	}
}

export function Scores(props){

	const params=useParams();
	const setId=parseInt(params.setid);
	props.spt("High Scores");
	props.sbt(`/cardset/${setId}`);
	const [hs, setHs] = React.useState(null);

	const [slist, setSlist] = React.useState(null);
	async function setUpScores(){
		//let cScores = placeholderscores.scores.find(c=>(c.setid===setId)).highscores;
		let cScores = await getScores(setId);
		//console.log("cScores: ", cScores);
		let personalScore = await getPersonalScore(setId);
		let scoreList = [];
		cScores.sort((a,b)=>(parseFloat(a.seconds)-parseFloat(b.seconds)));
		//console.log(cScores);
	
		//console.log(scoreList);	
		for (let i=0; i<cScores.length && i<10; i++) {
			let t=cScores[i].seconds;
			scoreList.push({place:(i + 1), user:cScores[i].player, time:`${Math.floor(t/60)}:${String(Math.floor(t % 60)).padStart(2,0)}`});
		};
		setSlist(scoreList);
		setHs(personalScore);
	}
	setUpScores();

	

	function PersonalScore(){
		if (hs){
			return(
				<div className ="personalscore">
					<h2>Your top score: <span className ='scorenumber'>
						{Math.floor(hs/60)}:{String(Math.floor(hs % 60)).padStart(2,0)}
					</span></h2>
				</div>	
			);
		}

	}
	function Scorespace(){
		if (slist){

			return(
				<div className ="pagespace scorespace">	
					<PersonalScore />	
					<table>
						<thead>
						<tr>
							<th>place
							</th>
							<th> user</th>
							<th> time</th>
						</tr>
						</thead>
						<tbody>
						{slist.slice(0,(hs ? 8 : 10)).map((r)=> <ScoreRow place={r.place} user={r.user} time={r.time}/>)}
						</tbody>
					</table>
		
				</div>
			);
		} else {
			return <div className='pagespace scorespace'><h1>Loading...</h1></div>
		}
	}
	return(
		<div className='main'>
			<Scorespace />
		</div>
	);
}