import React, { Component } from 'react'
import Card from './card/Card'
import WaitingPhase from './waiting/WaitingPhase'

import './PlanningPokerApplication.css'

class PlanningPokerApplication extends Component {
	
	state = this.props.state

	/**
	* cardSelection function
	* @param value
	* This function
	**/
	cardSelection = (value) => {
		this.setState({
			selectedCard: value
		})
		setTimeout(() => {
			if (this.state.selectedCard) {
				this.setState({
					phase: this.state.phases.waiting_phase
				})
			}
		}, 500)
	}

	/*
	* reSelect() sets the states phase back to select. If the users want's to change the card selected. 
	* Not used at the moment since it also makes the other players cards to change value.
	*/
	reSelectCard = () => {
		this.setState({
			phase: 'select'
		})
	}

	/*
	* updateSelectedCardForTeamMembers change the state for players selected card.
	* Could handle teamMembers state sepparately, but I think it's better to handle 
	* state changes in one place.
	*/
	updateSelectedCardForTeamMembers = (teamMembers, num, index) => {
		this.setState({
			teamMembers
		})

		if ((index + 1) === num) {
			this.setState({
				teamMembersReady: true
			})
		}
	}
	
	render() {
		
		// Set up the users cards for the select phase
		let cards = this.props.deck.cards.map((card, index) => {
			let active = (card.toString() === this.state.selectedCard ? true : false)
			return <Card card={card} key={index} onClick={this.cardSelection} active={active} />
		})

		// Render this if pahse is select
		if (this.state.phase === 'select') {
			return (
				<div className="PlanningPokerApplication">
					<article className="userStory">
						<header>
							<h3>Create a planning poker app</h3>
						</header>
						<div>	
							To better plan our resources, we need a fun and smooth way to estimate time and effort for our different cases in the backlog. Therefore, we need 
							to develop a planning poker application. 
						</div>
					</article>
					<h2>What is your estimate?</h2>
					<ul className="cards">
						{cards}
					</ul>
				</div>
			)	
		}
		// Render this if pahse is waiting
		if (this.state.phase === 'waiting') {
			/*
			* Setting up some props for my waiting phase component: 
			*  - the card deck
			*  - teamMembers that will play
			* Also setting the funtion updatePlayerSate as a props that let's me communicate between the waiting phase component 
			* and this component. This let's me handle all state changes in this component. 
			*/
			return (
				<div>
					<WaitingPhase deck={this.props.deck} players={this.state.teamMembers} updatePlayerState={this.updateSelectedCardForTeamMembers} />
					{this.state.teamMembersReady && (
					<button>Reveal all cards!</button>
					)}
				</div>
			)
		}
	}
}

export default PlanningPokerApplication

PlanningPokerApplication.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}