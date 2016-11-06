import React from 'react'
import loader from './player-selecting.gif'

const Player = ({ player }) => {
	return (
		<div className="player">
			<p>{player.nickname}</p>
			<p>{player.role}</p>
			{!player.selectedCard ? <img src={loader} alt="loader" /> : <p>Player has selected card</p>}
		</div>
	)
}

export default Player

Player.propTypes = {
	player: React.PropTypes.object.isRequired
}