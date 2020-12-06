import React from "react";
import {Link} from 'react-router-dom';

export default class Host extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				eventtitle: "",
				eventdesc: "",
				eventurl: ""
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
					<h4>Event Hosting</h4>
					<form onSubmit={this.submitForm}>
						<input
						 id="eventtitle"
						 name="eventtitle"
						 autoComplete="off"
						 placeholder="Title"
						 value={formdata.eventtitle}
						 onChange={this.changeForm}
						/>
						<p id="titleError" className="errorReturn" />
						<textarea
						 id="eventdesc"
						 name="eventdesc"
						 placeholder="Event Description"
						 value={formdata.eventdesc}
						 onChange={this.changeForm}
						/>
						<input
						 id="eventurl"
						 name="eventurl"
						 placeholder="Event URL"
						 value={formdata.eventurl}
						 onChange={this.changeForm}
						/>
						<p id="urlError" className="errorReturn" />
						<div>
							<button
							 id="approveButton"
							 type="submit">
								Approve
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