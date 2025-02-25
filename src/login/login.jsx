import React from 'react';
import { AuthState } from './authState';
import '../app.css';




export function Login(props){
	function hideLogin(e) {
		{props.hideFunc(false)}
	};
	function loginNow(e) {
		{props.authfunc(AuthState.Authenticated)};
		hideLogin(e);
	}
	function logoutNow(e) {
		{props.authfunc(AuthState.Unauthenticated)};
		hideLogin(e);
	}
	function textChangeUname(e) {
		{props.unamefunc(e.target.value)};
	}
	function LoginOverlay(props){
		return(
			<form>
				<div className ="loginline">
					<label> username: </label>
					<input type="text" value={props.uname} onChange={textChangeUname}/>
				</div>
				<div className ="loginline">
					<label> password: </label>
					<input type="password" id="pword" />
				</div>
				<div className ="loginline">
					<button className ="btn btn-primary" onClick = {loginNow}> log in</button>
					<button className ="btn btn-primary" onClick = {loginNow}>create new account</button>
				</div>
			</form>
		);
	}
	function LogoutOverlay(props){
		return(
	
					<div className ="loginform">
						<div className="loginline">
							You are already logged in as {props.userName}. Would you like to log out?
						</div>
						<div className ="loginline">
							<button className ="btn btn-primary" onClick={logoutNow}> log out</button>
						</div>
					</div>
		);
	}
	
	function LoginForm(props){
		if (props.authState === AuthState.Unauthenticated){
			return (<LoginOverlay />);
		}
		if (props.authState === AuthState.Authenticated){
			return (<LogoutOverlay />);
		}
	}
	if (props.show){
		return(
			<div id="login_overlay">				
				<div className = 'settingsform'>
					<div className = 'overlaytitle'>
						<div className ='backbutton'>
							<a onClick = {hideLogin}>
								<img src = '/backbutton.png' alt="back" height="30px" />
							</a>
						</div>
						<h2> Login </h2>
					</div>
					<div className ="loginform">
						{<LoginForm authState={props.authState}/>}
					</div>
				</div>
			</div>
		);
	};
}