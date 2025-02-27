import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams} from 'react-router-dom';
import '../app.css';

export function SunsetNotifier(props){
	if (props.show){
		return(			
			<div className = "sidebartext sunsetnotes">
				<p> 5:33 pm - The sun is setting in your area!</p>
			</div>
		);
	}

}