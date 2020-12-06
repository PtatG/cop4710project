import React from "react";
import {Link} from 'react-router-dom';

export default class Lookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				adminname: ""
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
			<div className="userPage">
				<div className="container">
					<h4>Host Search</h4>
					<form onSubmit={this.submitForm}>
						<input
						 id="adminname"
						 name="adminname"
						 autoComplete="off"
						 placeholder="Search Term"
						 onChange={this.changeForm}
						 value={formdata.adminname}
						/>
						<div>
							<button type="submit">
								Search
							</button>
						</div>
					</form>
				</div>
				<div className="container">
					<button 
					 className="collapsible">
						Example Result
					</button>
					<div className="content">
						<p>Event 1</p>
						<p>Event 2</p>
						<p>Event 3</p>
					</div>
				</div>
			</div>
		)
	}
}