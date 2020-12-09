import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Lookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				adminname: "",
				results: "",
				eresults: ""
			}
		}
		this.changeForm = this.changeForm.bind(this);
		this.submitUsers = this.submitUsers.bind(this);
		this.submitAdmins = this.submitAdmins.bind(this);
		this.submitUserEvents = this.submitUserEvents.bind(this);
		this.submitAdminEvents = this.submitAdminEvents.bind(this);
	}
	
	changeForm(e) {
		this.setState(state => ({
			formdata: {
				...state.formdata,
				[e.target.name]: e.target.value
			}
		}))
	}

	submitUsers(e) {
		console.log("Submitting...");
		
		var jsonPayload = `
			{
				"token": "${this.props.user.token}"
			}
		`
		
		fetch('http://127.0.0.1:8080/listUsers/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("search-err");
			elem.innerHTML = response.message;
			console.log('Success:', response);
			this.setState({ results: response.users });
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
		
		e.preventDefault();
	}
	
	submitAdmins(e) {
		console.log("Submitting...");
		
		var jsonPayload = `
			{
				"token": "${this.props.user.token}"
			}
		`
		
		fetch('http://127.0.0.1:8080/listAdmins/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("search-err");
			elem.innerHTML = response.message;
			console.log('Success:', response);
			this.setState({ results: response.admins });
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
		
		e.preventDefault();
	}
	
	submitUserEvents(userid) {
		console.log("Submitting...");
		console.log(this.state.formdata)
		
		var jsonPayload = `
			{
				"token" : "${this.props.user.token}",
				"id" : "${userid}"
			}
		`
		
		console.log(jsonPayload);
		
		fetch('http://127.0.0.1:8080/userEvents/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("search-err");
			elem.innerHTML = response.message;
			console.log('Success:', response.titles);
			this.setState({ eresults: response.titles || []});
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
	}
	
	submitAdminEvents(userid) {
		console.log("Submitting...");
		console.log(this.state.formdata)
		
		var jsonPayload = `
			{
				"token" : "${this.props.user.token}",
				"id" : "${userid}"
			}
		`
		console.log(jsonPayload);
		
		fetch('http://127.0.0.1:8080/adminEvents/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		}).then(res => {
			console.log(res)
			return res.json()
		}).then(response => {
			var elem = document.getElementById("search-err");
			elem.innerHTML = response.message;
			console.log('Success:', response.events);
			this.setState({ eresults: response.events || []});
			setTimeout(() => {
				elem.innerHTML = "";
			}, 5000)
		});
	}
	
	render() {
		const {formdata} = this.state;
		
		const sresult = []
		const temp = []
		const temp2 = []
		const temp3 = []
		var result
		
		if (this.state.results != null)
		{
			temp.push(
				<tbody>
					<tr>
						<td key="-1" style={{borderBottom:"2px solid black"}}>
							<p style={{fontWeight:"bold"}}>Username</p>
						</td>
					</tr>
				</tbody>
			)
			for (var i = 0; i < this.state.results.length; i++)
			{
				result = this.state.results[i];
				temp.push(
					<tbody key={i}>
						<tr id={i} key={i}>
							<td>
								{result.username}
							</td>
							<button
							 type="button"
							 onClick={() => this.submitAdminEvents(result.id)}>
								Hosted Events
							</button>
							<button
							 type="button"
							 onClick={() => this.submitUserEvents(result.id)}>
								Joined Events
							</button>
						</tr>
					</tbody>
				)
			}
			sresult.push(
				<table className="resultsTable" style={{width:"200px"}}>
					{temp}
				</table>
			)
		}
		if (this.state.eresults != null)
		{
			temp2.push(
				<tbody>
					<tr>
						<td key="-1" style={{borderBottom:"2px solid black"}}>
							<p style={{fontWeight:"bold"}}>Title</p>
						</td>
					</tr>
				</tbody>
			)
			for (var i = 0; i < this.state.results.length; i++)
			{
				temp2.push(
					<tbody key={i}>
						<tr id={i} key={i}>
							<td>
								{this.state.eresults[i].title}
							</td>
						</tr>
					</tbody>
				)
			}
			temp3.push(
				<table className="resultsTable" style={{width:"200px"}}>
					{temp2}
				</table>
			)
		}
		return (
			<div className="userPage">
				<div className="scontainer">			
					<p id="search-err" className="errorReturn"></p>
					<form onSubmit={this.submitUsers}>
						<button type="submit">
							All Users
						</button>
					</form>
					<form onSubmit={this.submitAdmins}>
						<button type="submit">
							All Admins
						</button>
					</form>
				</div>
				<div className="container">
					{sresult}
				</div>
				<div className="container">
					{temp3}
				</div>
			</div>
		)
	}
}

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(Lookup);