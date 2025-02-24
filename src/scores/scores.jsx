import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './scorescreen.css';

function ScoreRow({props = {place:'0', user:'loading',time:'0:00'}}){
	return(
		<tr>
			<td>{props.place}</td>
			<td>{props.user}</td>
			<td>{props.time}</td>
		</tr>
	);
}


export function Scores(){
	const [scoreList, setScoreList] = React.useState(['']);
	React.useEffect(() => {
		setScoreList([
			{place: '1', user: 'jonsims', time: '0:20'},
			{place: '2', user: 'sjames', time: '0:50'},
			{place: '3', user: 'kayaklover15', time: '1:20'},
			{place: '4', user: 'mkblkwood', time: '1:28'}
		])
	});
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
				{scoreList.map((r)=> <ScoreRow place={{r}}/>)}
				<ScoreRow props = {{place: '1', user: 'jonsims', time: '0:20'}}/>

				<tr>
					<td>2</td>
					<td>sjames</td>
					<td>0:50</td>
				</tr>
				<tr>
					<td>3</td>
					<td>kayaklover15</td>
					<td>1:20</td>
				</tr>				<tr>
					<td>4</td>
					<td>mkblkwood</td>
					<td>1:28</td>
				</tr>				<tr>
					<td>5</td>
					<td>sjames02</td>
					<td>1:54</td>
				</tr>
			</table>

		</div>
		</div>
	);
}