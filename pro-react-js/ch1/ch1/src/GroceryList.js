import React, { Component } from 'react';

class GroceryList extends Component {
	render() {
		return (
			<ul>
				<ListItem quantity="1" name="Bread">Good</ListItem>
				<ListItem quantity="3" name="Eggs">Not Good</ListItem>
				<ListItem quantity="2" name="Milk">Awesome</ListItem>
			</ul>
		)
	}
}


class ListItem extends Component {
	render() {
		// console.log(this);
		return (
			<li>
				{this.props.quantity} Ⅹ {this.props.name} is {this.props.children}
			</li>
		)
	}
}

// 모듈 내보내기
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export
export default GroceryList;
