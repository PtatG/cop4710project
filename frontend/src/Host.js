import React from "react";
import {Link} from 'react-router-dom';

export default class Host extends React.Component {
	render() {
		return (
			<div className="registerPage">
				<div className="container">
					<h4>Event Hosting</h4>
					<form>
						<input
						 id="eventtitle"
						 name="eventtitle"
						 autoComplete="off"
						 placeholder="Title"
						/>
						<p id="titleError" className="errorReturn" />
						<textarea
						 id="eventdesc"
						 name="eventdesc"
						 placeholder="Event Description"
						/>
						<input
						 id="eventurl"
						 name="eventurl"
						 placeholder="Event URL"
						/>
						<p id="urlError" className="errorReturn" />
						<div>
							<button
							 type="button"
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