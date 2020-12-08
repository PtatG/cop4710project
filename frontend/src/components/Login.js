import React from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				loginusername: "",
				loginpassword: ""
			},
			loginSuccess: false
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
			
		fetch('http://127.0.0.1:8080/loginUser', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		})
		.then(response => response.json({a:1}))
		.then(data => {
			switch(data.message) {
				case "Username required.":
				case "Password required.":
				case "Error: Could not find user.":
				case "Incorrect password.":
					var elem = document.getElementById("errorReturn")
					elem.innerHTML = data.message;
					setTimeout(() => {
						elem.innerHTML = "";
					}, 5000);
					break;
				default:
					console.log("Success", data)
					this.props.login(data)
					this.setState({loginSuccess: true})
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
		const {formdata, loginSuccess} = this.state;
		if(loginSuccess) {
			return <Redirect to="/" />
		}
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

const login = data => ({
	type: "LOAD_USER",
	user: data
})

export default connect(null, {login})(Login);