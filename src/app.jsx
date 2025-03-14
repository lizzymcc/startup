import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';
import {SetSelect} from './SetSelect/SetSelect';
import {CardSet} from './cardset/cardset';
import {EditSet} from './cardset/editset';
import {Play} from './play/play';
import {Scores} from './scores/scores';
import {Login} from './login/login';
import {Userbar} from './login/userbar'
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
	const [loginDisp, setLoginDisp] = React.useState(false);
	const [pageTitle, setPageTitle] = React.useState('Set select');
	const [backTo, setBackTo] = React.useState("/");
	function loginShow(e) {
		if (!loginDisp){
			setLoginDisp(true);
		}
	}
	return (
		<BrowserRouter>
			<div className = "body">
				{<Login show={loginDisp} authState={authState} hideFunc={setLoginDisp} authfunc = {setAuthState} uname={userName} unamefunc = {setUserName}/>}
				<header>
					<Routes>
						<Route path='/' element={<EmptySpot />} exact />
						<Route path='*' element={<BackButton to={backTo}/>} />
					</Routes>
					<div className= 'pagetitle'>
						{pageTitle}
					</div>
					<Userbar authState={authState} lFunc={loginShow}/>
				</header>

					<Routes>
						<Route path='/' element={
							<SetSelect spt={setPageTitle} sbt={setBackTo}/>
						} exact />
						<Route path='/cardset/:setid' element={
							<CardSet  spt={setPageTitle} sbt={setBackTo}/>
						} />
						<Route path='/cardset/edit/:setid' element={
							<EditSet spt={setPageTitle} sbt={setBackTo} />
						} />
						<Route path='/play/:setid' element={
							<Play spt={setPageTitle} sbt={setBackTo}/>
						} />
						<Route path='/scores/:setid' element={
							<Scores spt={setPageTitle} sbt={setBackTo} />
						} />
						<Route path='*' element={
							<NotFound spt={setPageTitle} sbt={setBackTo} />
						} />
					</Routes>
				<footer> CS 260 project - Lizzy McClellan <a href = "https://github.com/lizzymcc/startup"> (GitHub)</a>  |  Sunrise/sunset API by <a href="https://sunrise-sunset.org/api"> sunrise-sunset.org </a></footer>
			</div>
		</BrowserRouter>
	);
};
