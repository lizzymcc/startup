import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import '../app.css';
import './scorescreen.css';

function ScoreRow(props = {place:'0', user:'loading',time:'0:00'}){
	return(
		<tr>
			<td>{props.place}</td>
			<td>{props.user}</td>
			<td>{props.time}</td>
		</tr>
	);
}


export function Scores(){
	const params=useParams();
	const setId=parseInt(params.setid);
	const [scoreList, setScoreList] = React.useState(['']);
	//console.log(scoreList);
	return(
		<div className='main'>
			<div className ="pagespace scorespace">
				<div className ="personalscore">
					<h2>Your top score: <span className ='scorenumber'>3:20</span></h2>
					<p>putting you in <span className ='ranknumber'>8th</span> place overall</p>
				</div>			
				<table>
					<tr>
						<th>place
						</th>
						<th> user</th>
						<th> time</th>
					</tr>
					{scoreList.map((r)=> <ScoreRow place={r.place} user={r.user} time={r.time}/>)}
				</table>

			</div>
		</div>
	);
}