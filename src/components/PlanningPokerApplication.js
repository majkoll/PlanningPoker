import React, { Component } from 'react'
import Card from './card/Card'
import WaitingPhase from './waiting/WaitingPhase'

import './PlanningPokerApplication.css'

class PlanningPokerApplication extends Component {
	
	state = this.props.state

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

	reSelectCard = () => {
		this.setState({
			phase: 'select'
		})
	}
	
	render() {
		let cards = this.props.deck.cards.map((card, index) => {
			let active = (card.toString() === this.state.selectedCard ? true : false)
			return <Card card={card} key={index} onClick={this.cardSelection} active={active} />
		})
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
		if (this.state.phase === 'waiting') {
			return (
				<WaitingPhase onClick={this.reSelectCard} />
			)
		}
	}
}

export default PlanningPokerApplication

PlanningPokerApplication.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}