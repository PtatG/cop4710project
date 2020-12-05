import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from "./Register";

function Routes(props) {
	return (
		<section className="container">
			<Switch>
				<Route exact path="/register" component={Register} />
			</Switch>
		</section>
	);
}

export default Routes;