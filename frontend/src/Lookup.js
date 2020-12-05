import React from "react";
import {Link} from 'react-router-dom';

export default class Lookup extends React.Component {
	render() {
		return (
			<div className="userPage">
				<div>
					<div className="container">
						<h4>Host Search</h4>
						<form>
							<input
							 id="adminname"
							 name="adminname"
							 autoComplete="off"
							 placeholder="Search Term"
							/>
							<div>
								<button
								 type="button"
								 type="submit">
									Search
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="container">
					<button 
					 type="button"
					 class="collapsible">
						Example Result
					</button>
					<div class="content">
						<p>Event 1</p>
						<p>Event 2</p>
						<p>Event 3</p>
					</div>
				</div>
			</div>
		)
	}
}