import React, { Component } from 'react';
import logo from './logo.svg';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: 'React'
    }
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    return (
      <div>
        Search Term:
        <input type="search" value={this.state.searchTerm} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

export default Search;
