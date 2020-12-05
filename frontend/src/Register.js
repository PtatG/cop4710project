import React from "react";
import {Link} from 'react-router-dom';

export default class Register extends React.Component {
	render() {
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Register</h4>
					<input
					id="registeremail"
					name="registeremail"
					autoComplete="off"
					placeholder="Your email address"
					/>
					<input
					id="registeruser"
					name="registeruser"
					autoComplete="off"
					placeholder="Your username"
					/>
					<input
					id="registercity"
					name="registercity"
					autoComplete="off"
					placeholder="Your city"
					/>
					<input
					id="registerpassword"
					name="registerpassword"
					type="password"
					placeholder="Choose a safe password"
					/>
					<div>
						<button
						className="registerButton2"
						type="button"
						type="submit">
							Create Account
						</button>
					</div>
				</div>
			</div>
		)
	}
}