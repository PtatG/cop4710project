import React from "react";
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
	render() {
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Login</h4>
					<form>
						<input
						 id="loginemail"
						 name="loginemail"
						 autoComplete="off"
						 placeholder="Your email address"
						/>
						<p id="emailError" className="errorReturn" />
						<input
						 id="loginpassword"
						 name="loginpassword"
						 type="password"
						 placeholder="Choose a safe password"
						/>
						<p id="passwordError" className="errorReturn" />
						<div>
							<button
							 type="button"
							 id="loginButton"
							 type="submit">
								Login
							</button>
						</div>
						<p
						 id="errorReturn"
						 className="errorReturn" 
						/>
					</form>
				</div>
			</div>
		)
	}
}