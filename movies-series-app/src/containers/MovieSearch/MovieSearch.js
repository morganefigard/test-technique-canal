import './MovieSearch.css';
import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

export default class MovieSearch extends Component {
  constructor() {
    super();

    this.state = {
      searchResults : []
    }
  }

  setSearchResults = (results) => {
    this.setState(() => ({ searchResults : results }));
  }
  
  render() {
    return (
      <div>
        <SearchBar 
          setSearchResults={this.setSearchResults}
        />
        <ul>
          {this.state.searchResults.map(movie => (
          <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
