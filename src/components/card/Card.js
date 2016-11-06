import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import './Card.css'

class Card extends Component {

	clickHandler = (e) => {
		console.log(e.target)
		this.props.onClick(e.target.id)	
	}
	
	render() {

		let typeOfCard = (this.props.card.toString() === '?') ? 'question' : this.props.card.toString(),
			active = (this.props.active) ? 'active' : '',
			classes = classNames('Card', typeOfCard, active)
		
		return (
			<li id={typeOfCard} className={classes} onClick={this.clickHandler}>{ this.props.card }</li>
		)	
	}
	
}

export default Card

Card.propTypes = {
	onClick: PropTypes.func.isRequired,
	card: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	active: PropTypes.bool
	
}