import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		}
		this.submitForm = this.submitForm.bind(this);
	}
	
	submitForm(e) {
		console.log("Submitting...");
		console.log(this.state.formdata)
		
		var jsonPayload = `
			{
				"token": "${this.props.user.token}"
			}
		`
		
		console.log(jsonPayload);
		
		const {formdata} = this.state;
		fetch('http://127.0.0.1:8080/listSelfEvents/', {
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
			this.setState({ results: response.events || []});
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
		var result = null;
		
		if (this.state.results.length != 0)
		{
			temp.push(
					<thead style={{fontWeight:"bold"}}>
						<tr key="-1">
							<td>
								Title
							</td>
							<td>
								City
							</td>
							<td>
								Start Date
							</td>
							<td>
								End Date
							</td>
							<td>
								Description
							</td>
						</tr>
					</thead>
			)
			for (var i = 0; i < this.state.results.length; i++)
			{
				result = this.state.results[i];
				temp.push(
						<tbody key={i}>
							<tr id={i} key={i}>
								<td>
									{result.title}
								</td>
								<td>
									{result.city}
								</td>
								<td>
									{result.startdate.substring(0,10)}
								</td>
								<td>
									{result.enddate.substring(0,10)}
								</td>
								<td>
									{result.description}
								</td>
							</tr>
						</tbody>
				)
			}
			sresult.push(
				<table className="resultsTable">
					{temp}
				</table>
			)
		}
		return (
			<div className="userPage">
				<div>
					<div className="scontainer">
						<div style={{width:"500px",margin:"auto"}}>
							<form onSubmit={this.submitForm}>
								<div>
									<button
									 type="button"
									 type="submit">
										My Events
									</button>
								</div>
							</form>
							<p id="search-err" className="errorReturn"></p>
						</div>
						{sresult}
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(Search);