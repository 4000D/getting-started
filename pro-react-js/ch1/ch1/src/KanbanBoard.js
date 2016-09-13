import React, { Component, PropTypes } from 'react';
import List from './List';

class KanbanBoard extends Component {
	render() {
		return(
			<div className='app'>

				<List id='todo' title='To Do'
					cards={this.props.cards.filter( card => card.status === 'todo' )}>
				</List>

				<List id='in-progress' title='In Progress'
					cards={this.props.cards.filter( card => card.status === 'in-progress' )}>
				</List>

				<List id='done' title='Done'
					cards={this.props.cards.filter( card => card.status === 'done' )}>
				</List>

			</div>
		);
	}
}

KanbanBoard.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object)
};

export default KanbanBoard;
