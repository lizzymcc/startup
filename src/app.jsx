import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import {SetSelect} from './SetSelect/SetSelect';
import {CardSet} from './cardset/cardset';
import {EditSet} from './cardset/editset';
import {Play} from './play/play';
import {Scores} from './scores/scores';
import {Login} from './login/login';
import { AuthState } from './login/authState';
import './app.css';



function NotFound(){
	return(	
		<h1>404 not found</h1>
	);
}
function EmptySpot(){
	return <div></div>;
}
function BackButton({to}){
	return(
		<div class = 'backbutton'> 
		<NavLink to={to}>
			<img src = '/backbutton.png' alt='back' height='30px'/>
			</NavLink>
		</div>
	);
}
export default function App() {
	const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
	const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
	const [authState, setAuthState] = React.useState(currentAuthState);
	const [loginDisp, setLoginDisp] = React.useState('none');
	return (
		<BrowserRouter>
			<div className = "body">
				{<Login disp={loginDisp}/>}
				<header>
					<Routes>
						<Route path='/' element={<EmptySpot />} exact />
						<Route path='/cardset/:setid' element={<BackButton to= '/' />} />
						<Route path='/cardset/edit/:setid' element={<BackButton to= '/cardset/:setid' />} />
						<Route path='/play/:setid' element={<BackButton to= '/cardset/:setid' />} />
						<Route path='/scores/:setid' element={<BackButton to= '/cardset/:setid' />} />
						<Route path='*' element={<BackButton to='/' />} />
						
					</Routes>
					<div className= 'pagetitle'>
						page title will go here
					</div>
					<div className='header-user'>
						<button className= "btn btn-light btn-sm">
							Login
					</button></div>
				</header>
					<Routes>
						<Route path='/' element={<SetSelect />} exact />
						<Route path='/cardset/:setid' element={<CardSet />} />
						<Route path='/cardset/edit/:setid' element={<EditSet />} />
						<Route path='/play/:setid' element={<Play />} />
						<Route path='/scores/:setid' element={<Scores />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				<footer> CS 260 project - Lizzy McClellan <a href = "https://github.com/lizzymcc/startup"> (GitHub)</a> </footer>
			</div>
		</BrowserRouter>
	);
};
