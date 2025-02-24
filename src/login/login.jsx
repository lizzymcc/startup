import React from 'react';
import { AuthState } from './authState';
export function Login({props}){
	
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

	);
}