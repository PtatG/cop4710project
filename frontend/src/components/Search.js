import React from "react";
import {Link} from 'react-router-dom';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				cityname: ""
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
		
		const {formdata} = this.state;
		fetch('http://127.0.0.1:8080/eventsByCity/'+formdata.cityname, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("search-err");
			elem.innerHTML = response.message;
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
		
		e.preventDefault();
	}
	
	render() {
		const {formdata} = this.state;
		return (
			<div className="userPage">
				<div>
					<div className="container">
						<h4>Event Search</h4>
						<form onSubmit={this.submitForm}>
							<input
							 id="cityname"
							 name="cityname"
							 autoComplete="off"
							 placeholder="City Name"
							 onChange={this.changeForm}
							 value={formdata.cityname}
							/>
							<div>
								<button
								 type="button"
								 type="submit">
									Search
								</button>
							</div>
						</form>
						<p id="search-err" className="errorReturn"></p>
					</div>
				</div>
			</div>
		)
	}
}