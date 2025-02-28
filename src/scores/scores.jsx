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


export function Scores(props){

	const params=useParams();
	const setId=parseInt(params.setid);
	let uname =(localStorage.getItem("userName") || '');
	let hs = (parseFloat(localStorage.getItem(`${uname} hs ${setId}`)) || -1);
	function setUpScores({uname, hs}){
		let cScores = placeholderscores.scores.find(c=>(c.setid===setId)).highscores;
		let scoreList = [];
		if (!(uname === '') && hs >-1){
			cScores.push({player: uname, seconds: hs});	//for some reason this keeps putting two of them in the score  list. not sure if that's a bug but it's something we'll change when we get to database stuff anyway so :shrug: 	
		}
		cScores.sort((a,b)=>(parseFloat(a.seconds)-parseFloat(b.seconds)));
		console.log(cScores);
	
		console.log(scoreList);	
		props.spt("High Scores");
		props.sbt(`/cardset/${setId}`);
		for (let i=0; i<cScores.length && i<10; i++) {
			let t=cScores[i].seconds;
			scoreList.push({place:(i + 1), user:cScores[i].player, time:`${Math.floor(t/60)}:${String(Math.floor(t % 60)).padStart(2,0)}`});
		};
		return scoreList;
	}
	const [slist, setSlist] = React.useState(setUpScores({uname,hs}))
	

	function PersonalScore(){
		if (!(uname === '') && hs >-1){
			return(
				<div className ="personalscore">
					<h2>Your top score: <span className ='scorenumber'>
						{Math.floor(hs/60)}:{String(Math.floor(hs % 60)).padStart(2,0)}
					</span></h2>
				</div>	
			);
		}

	}
	return(
		<div className='main'>
			<div className ="pagespace scorespace">	
				<PersonalScore />	
				<table>
					<tr>
						<th>place
						</th>
						<th> user</th>
						<th> time</th>
					</tr>
					{slist.map((r)=> <ScoreRow place={r.place} user={r.user} time={r.time}/>)}
				</table>

			</div>
		</div>
	);
}