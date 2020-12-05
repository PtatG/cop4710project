import React, {useState} from 'react';
import {connect} from 'react-redux';

const submitName = (name) => ({
		type: "TEST",
		text: name,
});

function Register(props) {
	const [name, setName] = useState("");
	return (
		<div>
			<p>Register</p>
			<form onSubmit={(e) => {
				e.preventDefault();
				props.submitName(name);
			}}>
				<input name="name" onChange={(e) => setName(e.target.value)} value={name} />
				<input type="submit" />
			</form>
			<p>{props.text}</p>
		</div>
	);
}

const mapState = (state) => ({
	text: state.text
})

export default connect(mapState, {submitName})(Register);