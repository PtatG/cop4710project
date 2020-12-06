import React from 'react';
import ReactDOM from 'react-dom';
import {render} from "react-dom";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

import App from './App';
import Nav from './components/Nav';
import Lookup from './components/Lookup';
import Host from './components/Host';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';

import reportWebVitals from './reportWebVitals';

function Index() {
	return (
		<BrowserRouter>
			<div className="outerContainer">
				<Nav />
				<Route path='/' exact component={App} />
				<Route path='/lookup' exact component={Lookup} />
				<Route path='/host' exact component={Host} />
				<Route path='/search' exact component={Search} />
				<Route path='/login' exact component={Login} />
				<Route path='/register' exact component={Register} />
			</div>
		</BrowserRouter>
	);
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
