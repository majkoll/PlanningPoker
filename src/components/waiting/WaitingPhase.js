import React, { Component } from 'react'

class WaitingPhase extends Component {
	
	goBack = () => {
		this.props.onClick()
	}

	render() {
		return (
			<div>
				<button onClick={this.goBack}>Re-select card</button>
				<h1>Waiting phase</h1>
			</div>
		)
	}
}

export default WaitingPhase

WaitingPhase.propTypes = {
	onClick: React.PropTypes.func.isRequired
}