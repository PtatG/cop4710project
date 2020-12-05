import React from "react";
import {Link} from 'react-router-dom';

export default class Search extends React.Component {
	render() {
		return (
			<div className="userPage">
				<div>
					<div className="container">
						<h4>Event Search</h4>
						<form>
							<input
							 id="cityname"
							 name="cityname"
							 autoComplete="off"
							 placeholder="City Name"
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
			</div>
		)
	}
}