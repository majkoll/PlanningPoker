import React, { Component } from 'react'
import Card from '../card/Card'

import './Reveal.css'

class Reveal extends Component {
	
	restartApp = () => {
		this.props.restart()
	}
	
	flipCard = () => {
		
	}
	
	render() {
		
		let teamMemberCard = this.props.team.map((t, index) => {
			return <Card player={t.nickname} card={t.selectedCard} onClick={this.flipCard} key={t.id} />
		}) 
		
		return (
			<div className="RevealPhase">
				<ul>
					<Card player="User" card={this.props.userCard} onClick={this.flipCard} />
					{teamMemberCard}
				</ul>
				<button className="phaseChangeButton" onClick={this.restartApp}>Restart</button>
			</div>
		)	
	}
	
	
}

export default Reveal

Reveal.propTypes = {
	userCard: React.PropTypes.string.isRequired,
	team: React.PropTypes.array.isRequired,
	restart: React.PropTypes.func.isRequired
}


// <RevealPhase userCard={this.state.selectedCard} team={this.state.teamMembers} />