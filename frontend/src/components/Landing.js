import React from 'react';
import {connect} from 'react-redux';

function Landing(props) {
	console.log(props.text)
	return (
		<div style={{marginTop: "5rem", textAlign: "center"}}>
			<p>Landing</p>
			<p>{props.text}</p>
		</div>
	);
}

const mapState = state => ({
	text: state.text
})

export default connect(mapState)(Landing);