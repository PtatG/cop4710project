import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";
import {connect} from 'react-redux';

function App(props) {
  if(props.user) console.log(props.user);
  return (
    <div className = "homePage">
		<div className = "homeContainer">
			<h3>Welcome to The Exhibition</h3>
			<p>Click the links above to explore our events.</p>
		</div>
	</div>
  );
}

const mapState = state => ({
	user: state.user
})

export default connect(mapState)(App);
