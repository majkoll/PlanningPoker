import React from 'react'
import loader from './player-selecting.gif'

//import Card from '../card/Card'

const Player = ({ player }) => {
	return (
		<div className="player">
			<p>{player.nickname}</p>
			<p>{player.role}</p>
			{!player.selectedCard ? <img src={loader} alt="loader" /> : <p>Player done!</p>}
		</div>
	)
}

export default Player

Player.propTypes = {
	player: React.PropTypes.object.isRequired
}