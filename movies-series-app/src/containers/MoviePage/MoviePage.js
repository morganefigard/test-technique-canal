import './MoviePage.css';
import React, { Component } from 'react';
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';


export default class MoviePage extends Component {
  constructor() {
    super();

    this.state  = {
      movies : [],
      currentPage : 1,
      totalPages : 0
    }
  }

  componentWillMount() {
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=original_title.asc&vote_count.gte=2000&page=1").then(({ data }) => {
      this.setState(() => ({
        currentPage : data.page,
        totalPages : data.total_pages
      }));

      for (let i=0; i<data.results.length; i++) {
        this.setState(prevState => ({
          movies: [
            ...prevState.movies, 
            {
              "title": data.results[i].title,
              "vote_average": data.results[i].vote_average,
              "poster_path": data.results[i].poster_path
            }
          ]
        }))
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Movies</h1>
        <p>current page : {this.state.currentPage}</p>
        <p>total page : {this.state.totalPages}</p>
        <MovieGrid
          movies={this.state.movies}
        />
      </div>
    )
  }
}
