import React, { Component } from 'react'
import Player from '../player/Player'
import update from 'react-addons-update'

class WaitingPhase extends Component {

	componentDidMount() {
		// When this component is ready, I loop through every teamMember that is playing the game.
		// Each of the will select a card
		this.props.players.forEach((player, index) => {
			// Fake that the players will take a different amount of time do select a card.
			setTimeout(() => {
				// function that let's the team members select a card
				this.playersSelectCard(index)		
			}, (index+1) * 1000)
		})
	}

	/*
	* This function let's each team member select a card from the deck.
	*/
	playersSelectCard = ( index ) => {
		let cards = this.props.deck.cards, // set all card values to string
			value = cards[Math.round(Math.random() * (12 - 0) + 0)], // randomise a card that the team members select
			teamMembers	= this.props.players // current team members are saved

		// update team members state selectedCard. It's null from the beginning but will now get a value.	
		teamMembers[index] = update(teamMembers[index], {selectedCard: {$set: value}})
		
		this.updatePlayerState(teamMembers, teamMembers.length, index)
	}

	// This function is not used. But if you use the button element with this function, 
	// it calls the reSelectCard function in the PlanningPokerApplication component, that sets
	// the phase back to select.
	goBack = () => {
		this.props.onClick()
		// <button onClick={this.goBack}>Re-select card</button>
	}

	/*
	* This function calls a function in the parent component, that will update the applications state. 
	* In this case, the team members selected card state
	*/
	updatePlayerState = ( value, numberOfTeamMembers, index ) => {
		this.props.updatePlayerState(value, numberOfTeamMembers, index)
	}

	render() {
		let players = this.props.players.map((player, index) => {
			return <Player key={index} player={player} />
		})
		return (
			<div>
				<h1>Waiting for your team members</h1>
				{players}
			</div>
		)
	}
}

export default WaitingPhase

WaitingPhase.propTypes = {
	//onClick: React.PropTypes.func.isRequired, 
	players: React.PropTypes.array.isRequired,
	updatePlayerState: React.PropTypes.func.isRequired,
	deck: React.PropTypes.object.isRequired
}