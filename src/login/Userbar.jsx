import React from 'react';
import { AuthState } from './authState';
import '../app.css';
export function Userbar(props){
	if (props.authState === AuthState.Unauthenticated){
			return (
			<div className='header-user'>
				<button className= "btn btn-light btn-sm"  onClick={props.lFunc}>
					Login
			</button></div>);
	}
	else {
		return (
			<div className='header-user'>
				<button className= "btn btn-light btn-sm"  onClick={props.lFunc}>
					{localStorage.getItem("userName")}
				</button>
			</div>);
	}

}