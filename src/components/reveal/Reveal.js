import React, { Component } from 'react'
import Card from '../card/Card'

class Reveal extends Component {
	
	restartApp = () => {
		this.props.restart()
	}
	
	flipCard = () => {
		console.log('flip the card')
	}
	
	render() {
		
		let teamMemberCard = this.props.team.map((t, index) => {
			return <Card card={t.selectedCard} onClick={this.flipCard} key={t.id} />
		}) 
		
		return (
			<div>
				<b>Now all players will reveal their cards</b>
				<ul>
					<Card card={this.props.userCard} onClick={this.flipCard} />
					{teamMemberCard}
				</ul>
				<button onClick={this.restartApp}>Restart</button>
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