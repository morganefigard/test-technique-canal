import './MovieDetailPage.css'
import React, { Component } from 'react';
import axios from 'axios';

export default class MovieDetailPage extends Component {
  constructor() {
    super();

    this.state  = {
      cast : [],
      director : "",
      genres : [],
      originalLanguage : "",
      originalTitle : "",
      overview : "",
      posterPath : "https://via.placeholder.com/500x750.jpg?text=No+poster",
      releaseYear : "",
      runtime : "",
      tagline : "",
      title : "",
      voteAverage : 0
    }
  }

  buildDetailUrl = (movieId) => {
    let url = 
      "https://api.themoviedb.org/3/movie/"
      + movieId 
      + "?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US";
    
    return url;
  }

  buildPeopleUrl = (movieId) => {
    let url = 
      "https://api.themoviedb.org/3/movie/"
      + movieId 
      + "/credits?api_key=92b418e837b833be308bbfb1fb2aca1e";
    
    return url;
  }

  convertRuntime = (runtime) => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return hours + "h" + minutes + "m"
  }

  componentDidMount() {      
    axios.get(this.buildDetailUrl(19913))
      .then(({ data }) => {
        this.setState(() => ({
          genres : data.genres,
          originalLanguage : data.original_language,
          originalTitle : data.original_title,
          overview : data.overview,
          posterPath : data.poster_path,
          releaseYear : data.release_date.substring(0, 4),
          runtime : this.convertRuntime(data.runtime),
          tagline : data.tagline,
          title : data.title,
          voteAverage : data.vote_average
        }));
      })
      .catch((error) => console.log(error));

    axios.get(this.buildPeopleUrl("19913"))
      .then(({ data }) => {
        this.setState(() => ({
          cast : data.cast.slice(0, 3),
          director : data.crew.find(crewMember => crewMember.job === "Director").name
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const s = this.state;

    return (
      <div>
        <ul>
          <li key="title">{s.title}</li>
          <li key="release-year">{s.releaseYear}</li>
          {s.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
          <li key="runtime">{s.runtime}</li>
          <li key="tagline">{s.tagline}</li>
          <li key="overview">{s.overview}</li>
          <li key="original-title">{s.originalTitle}</li>
          <li key="director">{s.director}</li>
          {s.cast.map(actor => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
