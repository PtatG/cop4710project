import React from "react";
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				loginusername: "",
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
		
		var jsonPayload = '{"username" : "' + this.state.formdata.loginusername + '", "password" : "' + this.state.formdata.loginpassword + '"}';
			
		fetch('http://127.0.0.1:3000/loginUser', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			if (data.error == "") {
				this.setState({ redirect: "/" });
			}
			else {
				document.getElementById("errorReturn").innerHTML = data.error;
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			document.getElementById("errorReturn").innerHTML = error;
			return;
		});
		
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
						 id="loginusername"
						 name="loginusername"
						 autoComplete="off"
						 placeholder="Your username"
						 value={formdata.loginusername}
						 onChange={this.changeForm}
						/>
						<p id="nameError" className="errorReturn" />
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