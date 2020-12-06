import React from "react";
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				loginemail: "",
				loginpassword: ""
			}
		}
		this.changeForm = this.changeForm.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	
	changeForm(e) {
		this.setState(state => ({
			formdata: {
				...state.formdata,
				[e.target.name]: e.target.value
			}
		}))
	}
	
	submitForm(e) {
		console.log("Submitting...");
		console.log(this.state.formdata)
		e.preventDefault();
	}
	
	render() {
		const {formdata} = this.state;
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Login</h4>
					<form onSubmit={this.submitForm}>
						<input
						 id="loginemail"
						 name="loginemail"
						 autoComplete="off"
						 placeholder="Your email address"
						 value={formdata.loginemail}
						 onChange={this.changeForm}
						/>
						<p id="emailError" className="errorReturn" />
						<input
						 id="loginpassword"
						 name="loginpassword"
						 type="password"
						 placeholder="Your password"
						 value={formdata.loginpassword}
						 onChange={this.changeForm}
						/>
						<p id="passwordError" className="errorReturn" />
						<div>
							<button
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