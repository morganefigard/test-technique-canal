import './MovieGrid.css';
import axios from 'axios';
import React, { Component } from 'react';
import MoviePreview from '../../components/MoviePreview/MoviePreview';

export default class MovieGrid extends Component {
  constructor() {
    super();

    this.state = {
      movieList : []
    }
  }

  componentWillMount() {
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=original_title.asc&vote_count.gte=1000&page=1").then(({ data }) => {
      for (var i=0; i<data.results.length; i++) {
        this.setState(prevState => ({
          movieList: [
            ...prevState.movieList, 
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

  /*render() {
    return (
      <div>
        <ul>
          {this.state.movieList.map(movie => (
            <li>{movie.title} - {movie.vote_average}</li>
          ))}
        </ul>
      </div>
    );
  }*/

  render() {
    return (
      <div>
        {this.state.movieList.map(movie => (
        <MoviePreview 
          title={movie.title}
          rating={movie.vote_average}
          poster={movie.poster_path}
        />
        ))}
      </div>
    );
  }
}
