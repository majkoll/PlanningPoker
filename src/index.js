import React from 'react'
import ReactDOM from 'react-dom'
import PlanningPokerApplication from './components/PlanningPokerApplication'

import './cssReset.css'
import './index.css'

const state = {
	phase: 'select',
	phases: {
		select_phase: 'select',
		waiting_phase: 'waiting',
		reveal_phase: 'reveal'
	}, 
	teamMembers: [
		{
			id: 101,
			nickname: 'Mr Pink',
			role: 'Team Leader',
			selectedCard: null
		}, 
		{
			id: 102,
			nickname: 'Mr Green',
			role: 'Backend developer',
			selectedCard: null
		},
		{
			id: 103,
			nickname: 'Mr Yellow',
			role: 'Product owner',
			selectedCard: null
		},
	],
	teamMembersReady: false,
	selectedCard: null
}

const deck = {
	cards: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'coffee', 'questionMark']
}

ReactDOM.render(
  <PlanningPokerApplication state={state} deck={deck} />,
  document.getElementById('root')
);
