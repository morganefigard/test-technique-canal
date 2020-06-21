import './MovieSearch.css';
import React from 'react';
import MovieSearchBar from '../../components/MovieSearchBar/MovieSearchBar';
import MovieSearchResults from '../../components/MovieSearchResults/MovieSearchResults';
import { Movie } from '../../interfaces/Movies';


interface State {
  searchResults : Movie[]
}

export default class MovieSearch extends React.Component<any & any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchResults : []
    }
  }

  setSearchResults = (results: Movie[]) => {
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
