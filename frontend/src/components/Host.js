import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Host extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				eventtitle: "",
				eventdesc: "",
				eventurl: "",
				startdate: "",
				enddate: "",
				eventcity: ""
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
		var jsonPayload = `
			{
				"token": "${this.props.user.token}",
				"title": "${formdata.eventtitle}",
				"description": "${formdata.eventdesc}",
				"url": "${formdata.eventurl}",
				"startdate": "${formdata.startdate}",
				"enddate": "${formdata.enddate}",
				"city": "${formdata.eventcity}"
			}
		`
		console.log(jsonPayload);
		fetch('http://127.0.0.1:8080/createEvent', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("errorReturn");
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
						 placeholder="Event Description (Optional)"
						 value={formdata.eventdesc}
						 onChange={this.changeForm}
						/>
						<input
						 id="eventcity"
						 name="eventcity"
						 autoComplete="off"
						 placeholder="City (Optional)"
						 value={formdata.eventcity}
						 onChange={this.changeForm}
						/>
						<h1>Start Date</h1>
						<input type="date"
						 id="startdate"
						 name="startdate"
						 onChange={this.changeForm}
						/>
						<h1>End Date</h1>
						<input type="date"
						 id="enddate"
						 name="enddate"
						 onChange={this.changeForm}
						/>
						<input
						 id="eventurl"
						 name="eventurl"
						 placeholder="Event URL (Optional)"
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

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(Host);