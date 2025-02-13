import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './scorescreen.css';

export function Scores(){
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
				<tr>
					<td>1</td>
					<td>jonsims</td>
					<td>0:20</td>
				</tr>
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