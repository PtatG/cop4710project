import React from "react";
import {Link} from 'react-router-dom';

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				registeremail: "",
				registeruser: "",
				registercity: "",
				registerpassword: ""
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
		
		var jsonPayload = '{"username" : "' + this.state.formdata.registeruser + '", "password" : "' + this.state.formdata.registerpassword + '", "city" : "' + this.state.formdata.registercity + '", "email" : "' + this.state.formdata.registeremail + '"}';
		fetch('http://127.0.0.1:3000/registerUser', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			console.log(response)
		});
		
		e.preventDefault();
	}
	
	render() {
		const {formdata} = this.state;
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Register</h4>
					<form onSubmit={this.submitForm}>
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
				</div>
			</div>
		)
	}
}