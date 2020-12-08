import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Lookup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formdata: {
				adminname: "",
				results: ""
			}
		}
		this.changeForm = this.changeForm.bind(this);
		this.submitUsers = this.submitUsers.bind(this);
		this.submitAdmins = this.submitAdmins.bind(this);
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
	
	render() {
		const {formdata} = this.state;
		
		const sresult = []
		const temp = []
		
		if (this.state.results != null)
		{
			temp.push(
				<tbody>
					<tr>
						<td style={{borderBottom:"2px solid black"}}>
							<p style={{fontWeight:"bold"}}>Username</p>
						</td>
					</tr>
				</tbody>
			)
			for (var i = 0; i < this.state.results.length; i++)
			{
				temp.push(
					<tbody key={i}>
						<tr id={i} key={i}>
							<td>
								{this.state.results[i].username}
							</td>
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
			</div>
		)
	}
}

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(Lookup);