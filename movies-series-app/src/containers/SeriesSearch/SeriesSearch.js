import './SeriesSearch.css';
import React, { Component } from 'react';
import SeriesSearchBar from '../../components/SeriesSearchBar/SeriesSearchBar';
import SeriesSearchResults from '../../components/SeriesSearchResults/SeriesSearchResults';

export default class SeriesSearch extends Component {
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
        <SeriesSearchBar
          setSearchResults={this.setSearchResults}
        />
        <SeriesSearchResults 
          results={this.state.searchResults}
        />
      </div>
    )
  }
}
