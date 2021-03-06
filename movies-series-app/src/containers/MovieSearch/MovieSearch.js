import './MovieSearch.css';
import React, { Component } from 'react';
import MovieSearchBar from '../../components/MovieSearchBar/MovieSearchBar';
import MovieSearchResults from '../../components/MovieSearchResults/MovieSearchResults';

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
        <MovieSearchBar 
          setSearchResults={this.setSearchResults}
        />
        <MovieSearchResults 
          results={this.state.searchResults}
        />
      </div>
    )
  }
}
