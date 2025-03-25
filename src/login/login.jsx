import React from 'react';
import { AuthState } from './authState';
import '../app.css';




export function Login(props) {
	function hideLogin(e) {
		{ props.hideFunc(false) };
	};



	const LoginOverlay = React.memo(
		function LoginOverlay() {
			const [tuna, setTuna] = React.useState("");
			const [tp, setTp] = React.useState("");
			const [error, setError] = React.useState("");
			const textChangeUname = React.useCallback((e) => {
				setTuna(e.target.value);
			}, []);
			const textChangePword = React.useCallback((e) => {
				setTp(e.target.value);
			}, []);

			async function logSignNow(m, e) {
				//console.log((m ? 'login' : 'signup'), `attempt with username ${tuna}, password ${tp}`);
				const response = await fetch('/api/auth', {
					method: (m ? 'put' : 'post'),
					body: JSON.stringify({ uname: tuna, password: tp }),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
				if (response?.status === 200) {
					//console.log("response: ", response);
					{ props.authfunc(AuthState.Authenticated) };
					{ props.unamefunc(tuna) };
					localStorage.setItem('userName', tuna);
					hideLogin(e);
				} else {
					//console.log("response: ", response);
					const body = await response.json();
					setError(`Error: ${body.msg}`);
				}

			}

			async function loginNow(e) {
				e.preventDefault();
				logSignNow(true, e);
			}
			function signupNow(e) {
				e.preventDefault();
				logSignNow(false, e);
			}
			return (
				<form>
					<div className="loginline">
						<label> username: </label>
						<input key="username_input" type="text" value={tuna} onChange={textChangeUname} pattern="[A-Za-z0-9]{0,32}" />
					</div>
					<div className="loginline">
						<label> password: </label>
						<input type="password" id="pword" value={tp} onChange={textChangePword} />
					</div>
					<div className="loginline">
						<button className="btn btn-primary" onClick={loginNow}> log in</button>
						<button className="btn btn-primary" onClick={signupNow}>create new account</button>
						<span className="error">{error}</span>
					</div>
				</form>
			);
		});
	function LogoutOverlay() {
		async function logoutNow(e) {
			//console.log((m ? 'login' : 'signup'), `attempt with username ${tuna}, password ${tp}`);
			const response = await fetch('/api/auth', {
				method: 'delete',
			});
			if (response?.status === 204) {
				//console.log("response: ", response);
				{ props.authfunc(AuthState.Unauthenticated) };
				{ props.unamefunc('') };
				localStorage.setItem('userName', "");
				hideLogin(e);
			} else {
				//console.log("response: ", response);
				const body = await response.json();
				setError(`Error: ${body.msg}`);
			}

		}
		return (

			<div className="loginform">
				<div className="loginline">
					You are already logged in as {props.uname}. Would you like to log out?
				</div>
				<div className="loginline">
					<button className="btn btn-primary" onClick={logoutNow}> log out</button>
				</div>
			</div>
		);
	}

	function LoginForm(props) {
		if (props.authState === AuthState.Unauthenticated) {
			return (<LoginOverlay />);
		}
		if (props.authState === AuthState.Authenticated) {
			return (<LogoutOverlay />);
		}
	}
	if (props.show) {
		return (
			<div id="login_overlay">
				<div className='settingsform'>
					<div className='overlaytitle'>
						<div className='backbutton'>
							<a onClick={hideLogin}>
								<img src='/backbutton.png' alt="back" height="30px" />
							</a>
						</div>
						<h2> Login </h2>
					</div>
					<div className="loginform">
						{<LoginForm authState={props.authState} />}
					</div>
				</div>
			</div>
		);
	};
}