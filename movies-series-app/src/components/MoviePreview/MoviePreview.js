import './MoviePreview.css';
import React, { Component } from 'react';


export default class MoviePreview extends Component {
  render() {
    return (
      <div>
        <img src={"http://image.tmdb.org/t/p/w185/" + this.props.poster} />
        <p className="movie-name">{this.props.title}</p>
        <p className="movie-rating">{this.props.rating}</p>
      </div>
    )
  }
}
