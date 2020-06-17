import './MovieDetailPage.css'
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

export default class MovieDetailPage extends Component {
  constructor() {
    super();

    this.state  = {
      canalUrl : "",
      cast : [],
      director : "",
      frenchTitleParsed : "",
      genres : [],
      originalTitle : "",
      overview : "",
      posterPath : "",
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

  buildAltTitleUrl = (movieId) => {
    let url = 
      "https://api.themoviedb.org/3/movie/"
      + movieId 
      + "/alternative_titles?api_key=92b418e837b833be308bbfb1fb2aca1e";
    
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

  parseToURI = (string) => {
    return encodeURI(string.normalize("NFD").replace(/[\u0300-\u036f]|[\u002e]/g, "").replace(/[\u002d]|[\u0028]|[\u0029]|[\u002c]/g, " ").toLowerCase());
  }

  setFrenchTitle = () => {
    axios.get(this.buildAltTitleUrl(this.props.match.params.id))
    .then(({ data }) => {
      for (let i = 0; i < data.titles.length; i++) {
        if (data.titles[i].iso_3166_1) {
          if (data.titles[i].iso_3166_1 === "FR") {
            this.setState(() => ({
              frenchTitleParsed : this.parseToURI(data.titles[i].title)
            }));
            this.setCanalUrl(this.state.frenchTitleParsed);
            break;
          }
        }
      }
      this.setCanalUrl(this.parseToURI(this.state.title));
    })
    .catch((error) => console.log(error));
  }

  setCanalUrl = (title) => {
    let canalUrl = this.state.canalUrl;

    let searchUrl =
      "https://hodor.canalplus.pro/api/v2/mycanal/search/mycanal_channel_discover/800c32b7f357adeac52ffd0523fb2b93/query/"
      + title
      + "?distmodes=[%22tvod%22,%22catchup%22,%22svod%22]&channelImageColor=white&displayNBOLogo=true";
    
    axios.get(searchUrl).then(({data}) => {
      if (data.contents.length !== 0) {
        for (let i=0; i<data.contents.length; i++) {
          if (
            this.state.frenchTitleParsed === this.parseToURI(data.contents[i].title)
            || this.parseToURI(this.state.title) === this.parseToURI(data.contents[i].title)
            ) {
            canalUrl = "https://www.canalplus.com" + data.contents[i].onClick.path;
            this.setState(() => ({
              canalUrl : canalUrl
            }));
            break;
          }
        }
      }
    }).catch((error) => console.log(error));
  }

  hideOriginalTitle = () => {
    return this.state.originalTitle === this.state.title;
  }

  hideCanalButton = () => {
    return this.state.canalUrl === "";
  }

  componentDidMount() {      
    axios.get(this.buildDetailUrl(this.props.match.params.id))
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
        this.setFrenchTitle();
      })
      .catch((error) => console.log(error));

    axios.get(this.buildPeopleUrl(this.props.match.params.id))
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
        <Col className="movie-info">
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
          <p hidden={this.hideOriginalTitle()}><small>Original title: {s.originalTitle}</small></p>
          <p className="my-canal-button" hidden={this.hideCanalButton()}>
            <a className="my-canal-link" href={this.state.canalUrl}>See on 
              <img height="40px" src="https://static.canal-plus.net/resources/mycanal/mycanal-logo.svg"/>
            </a>
          </p>
        </Col>
      </Row>
    )
  }
}
