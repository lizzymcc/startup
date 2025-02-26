import React from 'react';
import { AuthState } from './authState';
import '../app.css';




export function Login(props){
	function hideLogin(e) {
		{props.hideFunc(false)};
	};

	

	const LoginOverlay = React.memo(
	function LoginOverlay(){	
		const [tuna, setTuna] = React.useState("");
		const textChangeUname = React.useCallback((e) => {
			setTuna(e.target.value);
		  }, []);
		function loginNow(e) {
			{props.authfunc(AuthState.Authenticated)};
			{props.unamefunc(tuna)};
			localStorage.setItem('userName',tuna);
			hideLogin(e);
		}
		return(
			<form>
				<div className ="loginline">
					<label> username: </label>
					<input key="username_input" type="text" value={tuna} onChange={textChangeUname} pattern="[A-Za-z0-9]{,32}"/>
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
	});
	function LogoutOverlay(){
		function logoutNow(e) {
			{props.authfunc(AuthState.Unauthenticated)};
			{props.unamefunc('')};
			localStorage.setItem('userName',"");
			hideLogin(e);
		}
		return(
	
			<div className ="loginform">
				<div className="loginline">
					You are already logged in as {props.uname}. Would you like to log out?
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