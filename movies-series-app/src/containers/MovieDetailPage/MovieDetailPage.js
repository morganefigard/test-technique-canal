import './MovieDetailPage.css'
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

export default class MovieDetailPage extends Component {
  constructor() {
    super();

    this.state  = {
      cast : [],
      director : "",
      genres : [],
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

  prettifyList = (list) => {
    for (let i=0; i<list.length; i++) {
      if (i !== list.length - 1) {
        list[i].name += ", ";
      }
    }

    return list;
  }

  prettifyCast = (cast) => {
    return this.prettifyList(cast.slice(0, 3));
  }

  convertRuntime = (runtime) => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return hours + "h" + minutes + "m"
  }

  getReleaseYear = (releaseDate) => {
    if (releaseDate) {
      return releaseDate.substring(0, 4);
    }
    else return "";
  }
  
  getMoviePoster = (posterPath) => {
    if (posterPath) {
      return "http://image.tmdb.org/t/p/w780" + posterPath;
    } else {
      return "https://via.placeholder.com/780x1170.jpg?text=No+poster";
    }
  }

  getDirector = (crew) => {
    return crew.find(crewMember => crewMember.job === "Director").name;
  }

  displayOriginalTitle = () => {
    return this.state.originalTitle === this.state.title;
  }

  componentDidMount() {      
    axios.get(this.buildDetailUrl(8392))
      .then(({ data }) => {
        this.setState(() => ({
          genres : this.prettifyList(data.genres),
          originalTitle : data.original_title,
          overview : data.overview,
          posterPath : data.poster_path,
          releaseYear : this.getReleaseYear(data.release_date),
          runtime : this.convertRuntime(data.runtime),
          tagline : data.tagline,
          title : data.title,
          voteAverage : data.vote_average
        }));
      })
      .catch((error) => console.log(error));

    axios.get(this.buildPeopleUrl(8392))
      .then(({ data }) => {
        this.setState(() => ({
          cast : this.prettifyCast(data.cast),
          director : this.getDirector(data.crew)
        }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    const s = this.state;

    return (
      <Row>
        <Col xl="3" lg="4" md="4" sm="4">
          <img 
            width="100%"
            src={this.getMoviePoster(s.posterPath)}
            alt={s.title}
          />
        </Col>
        <Col>
          <h1>{s.title}</h1>
          <h5>{s.releaseYear} • {s.genres.map(genre => (
              <span key={genre.id}>{genre.name} </span>
            ))} • {s.runtime}</h5>
          <p className="lead"><small><em>{s.tagline}</em></small></p>
          <h6>Overview</h6>
          <p>{s.overview}</p>
          <p><strong>Directed by: </strong>{s.director}</p>
          <p><strong>With: </strong>{s.cast.map(actor => (
            <span key={actor.id}>{actor.name}</span>
          ))}</p>
          <p hidden={this.displayOriginalTitle()}><small>Original title: {s.originalTitle}</small></p>
        </Col>
      </Row>
    )
  }
}
