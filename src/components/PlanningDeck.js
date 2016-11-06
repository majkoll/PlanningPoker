import React, { Component } from 'react'
import update from 'react-addons-update'

import Card from './card/Card'
import WaitingPhase from './waiting/WaitingPhase'
import RevealPhase from './reveal/Reveal'

import './PlanningDeck.css'

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

	goToRevealPhase = () => {
		this.setState({
			phase: this.state.phases.reveal_phase
		})
	}
	
	restartApplication = () => {
		this.state.teamMembers.forEach((t, index) => {
			let teamMembers = this.state.teamMembers
			teamMembers[index] = update(teamMembers[index], {selectedCard: {$set: null}})
			this.setState({
				teamMembers
			})
		})
		this.setState({
			selectedCard: null,
			teamMembersReady: false,
			phase: 'select'
		})
	}

	render() {
		
		// Set up the users cards for the select phase
		let cards = this.props.deck.cards.map((card, index) => {
			let active = (card === this.state.selectedCard ? true : false)
			return <Card card={card} key={index} onClick={this.cardSelection} active={active} />
		})

		if (!this.state.phase) {
			return false
		}

		return (
			<div className="PlanningPokerApplication">
				<header className="ppa-header">
					<h1>Planning Poker Application</h1>
					<p>Phase: {this.state.phase}</p>
				</header>
				{this.state.phase === 'select' && 
					<div className="selectionPhase">
						<article className="userStory">
							<header><p>Backlog case #1</p></header>
							<div className="case case-1">
								<header>
									<h3>Create a planning poker app</h3>
								</header>
								<div>	
									To better plan our resources, we need a fun and smooth way to estimate time and effort for our different cases in the backlog. Therefore, we need 
									to develop a planning poker application. 
								</div>
							</div>
						</article>
						<h4>What is your estimate?</h4>
						<ul className="cards">
							{cards}
						</ul>
					</div>
				}
				{this.state.phase === 'waiting' && 
					<div>
						<WaitingPhase deck={this.props.deck} players={this.state.teamMembers} updatePlayerState={this.updateSelectedCardForTeamMembers} />
						{this.state.teamMembersReady && 
							<button className="phaseChangeButton" onClick={this.goToRevealPhase}>Reveal cards</button>
						}
					</div>	
				}
				{this.state.phase === 'reveal' && 
					<RevealPhase userCard={this.state.selectedCard} team={this.state.teamMembers} restart={this.restartApplication} />
				}
			</div>
		)

		
	}
}

export default PlanningPokerApplication

PlanningPokerApplication.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}