import React from "react";
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				registername: "",
				registeremail: "",
				registeruser: "",
				registercity: "",
				registerpassword: ""
			},
			registerSuccess: false
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
		const {formdata} = this.state;
		var jsonPayload = `
			{
				"email": "${formdata.registeremail}",
				"name": "${formdata.registername}",
				"city": "${formdata.registercity}",
				"username": "${formdata.registeruser}",
				"password": "${formdata.registerpassword}"
			}
		`
		fetch('http://127.0.0.1:8080/registerUser', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			if(response.username !== undefined) {
				console.log(response.username)
				this.setState({registerSuccess: true})
				return;
			}
			var elem = document.getElementById("register-err");
			elem.innerHTML = response.message;
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
		
		e.preventDefault();
	}
	
	render() {
		const {formdata, registerSuccess} = this.state;
		if(registerSuccess) {
			return <Redirect to="/login" />
		}
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Register</h4>
					<form onSubmit={this.submitForm}>
						<input
						id="registername"
						name="registername"
						autoComplete="off"
						placeholder="Your name"
						onChange={this.changeForm}
						value={formdata.registername}
						/>
						<input
						id="registeremail"
						name="registeremail"
						autoComplete="off"
						placeholder="Your email address"
						onChange={this.changeForm}
						value={formdata.registeremail}
						/>
						<input
						id="registeruser"
						name="registeruser"
						autoComplete="off"
						placeholder="Your username"
						onChange={this.changeForm}
						value={formdata.registeruser}
						/>
						<input
						id="registercity"
						name="registercity"
						autoComplete="off"
						placeholder="Your city"
						onChange={this.changeForm}
						value={formdata.registercity}
						/>
						<input
						id="registerpassword"
						name="registerpassword"
						type="password"
						placeholder="Choose a safe password"
						onChange={this.changeForm}
						value={formdata.registerpassword}
						/>
						<div>
							<button
							className="registerButton2"
							type="submit">
								Create Account
							</button>
						</div>
					</form>
					<p id="register-err" className="errorReturn"></p>
				</div>
			</div>
		)
	}
}

const register = data => ({
	type: "LOAD_USER",
	user: data
})

export default connect(null, {register})(Register);