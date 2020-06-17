import './MovieSearch.css';
import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';

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
        <SearchResults 
          results={this.state.searchResults}
        />
      </div>
    )
  }
}
