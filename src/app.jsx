import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import {SetSelect} from './SetSelect/SetSelect';
import {CardSet} from './cardset/cardset';
import {EditSet} from './cardset/editset';
import {Play} from './play/play'
import './app.css';

function LoginOverlay(){
	return(
		<div id="login_overlay">				
			<div className = 'settingsform'>
				<div className = 'overlaytitle'>
					<div className ='backbutton'>
						<a>
							<img src = '/backbutton.png' alt="back" height="30px" />
						</a>
					</div>
					<h2> Login </h2>
				</div>
				<div className ="loginform">
					<form action = "index.html">
						<div className ="loginline">
							<label for = "uname"> username: </label>
							<input type="text" placeholder ="username" id="uname" />
						</div>
						<div className ="loginline">
							<label for = "pword"> password: </label>
							<input type="password" id="pword" />
						</div>
						<div className ="loginline">
							<button className ="btn btn-primary"> log in</button>
							<button className ="btn btn-primary">create new account</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	)
}
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
	return (
		<BrowserRouter>
			<div className = "body">
				{<LoginOverlay />}
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
						{/*<Route path='/scores/:setid' element={<Scores />} />*/}
						<Route path='*' element={<NotFound />} />
					</Routes>
				<footer> <a href = "https://github.com/lizzymcc/startup"> GitHub </a></footer>
			</div>
		</BrowserRouter>
	);
};
