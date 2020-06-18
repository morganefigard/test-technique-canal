import './MovieDetailPage.css'
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Observable, from, Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export default class MovieDetailPage extends Component {
  constructor() {
    super();

    this.state  = {
      canalUrl : "",
      cast : [],
      director : "",
      frenchTitleProps : "",
      frenchTitle : "",
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

    this.allInfos$ = new Observable();
    this.allInfosSub = new Subscription();
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

  buildSearchUrl = (title) => {
    let url =
      "https://hodor.canalplus.pro/api/v2/mycanal/search/mycanal_channel_discover/800c32b7f357adeac52ffd0523fb2b93/query/"
      + title
      + "?distmodes=[%22tvod%22,%22catchup%22,%22svod%22]&channelImageColor=white&displayNBOLogo=true";
    
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

  hideOriginalTitle = () => {
    return this.state.originalTitle === this.state.title;
  }

  hideCanalButton = () => {
    return this.state.canalUrl === "";
  }

  componentDidMount() {     
    this.allInfos$ = combineLatest(
      from(axios.get(this.buildDetailUrl(this.props.match.params.id))),
      from(axios.get(this.buildPeopleUrl(this.props.match.params.id))),
      from(axios.get(this.buildAltTitleUrl(this.props.match.params.id))),
    );

    this.allInfosSub = this.allInfos$
    .pipe(
      switchMap(([ infos, people, altTitle ]) => {
        this.setState(() => ({
          genres : this.prettifyList(infos.data.genres),
          originalTitle : infos.data.original_title,
          overview : infos.data.overview,
          posterPath : infos.data.poster_path,
          releaseYear : this.getReleaseYear(infos.data.release_date),
          runtime : this.convertRuntime(infos.data.runtime),
          tagline : infos.data.tagline,
          title : infos.data.title,
          voteAverage : infos.data.vote_average,
          cast : this.prettifyCast(people.data.cast),
          director : this.getDirector(people.data.crew),
          frenchTitleProps : altTitle.data.titles.find(title => title.iso_3166_1 === "FR"),
        }));
        
        if (this.state.frenchTitleProps) {
          this.setState(()=> ({
            frenchTitle : this.state.frenchTitleProps.title
          }))
        } else {
          this.setState(()=> ({
            frenchTitle : "thisQueryWillGiveNoResultsForSureBetterThan404Error1234567890"
          }))
        }

        return combineLatest(
          from(axios.get(this.buildSearchUrl(this.state.title))),
          from(axios.get(this.buildSearchUrl(this.state.originalTitle))),
          from(axios.get(this.buildSearchUrl(this.state.frenchTitle))),
        );
      })
    )
    .subscribe(([ hsrTitle, hsrOrigTitle, hsrFrTitle ]) => {
      const searchResults = hsrTitle.data.contents.concat(hsrOrigTitle.data.contents).concat(hsrFrTitle.data.contents);

      for (let i=0; i<searchResults.length; i++) {
        if (
          this.parseToURI(searchResults[i].title) === this.parseToURI(this.state.title)
          || this.parseToURI(searchResults[i].title) === this.parseToURI(this.state.originalTitle)
          || this.parseToURI(searchResults[i].title) === this.parseToURI(this.state.frenchTitle)
          ) {
          this.setState(() => ({
            canalUrl : "https://www.canalplus.com" + searchResults[i].onClick.path
          }));
          break;
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.allInfosSub) {
      this.allInfosSub.unsubscribe();
    }
  }

  render() {
    const s = this.state;

    return (
      <div>
        <NavigationBar />
        <div className="page detail-page">
          <Row>
            <Col xl="3" lg="4" md="4" sm="4">
              <img 
                width="100%"
                src={this.getMoviePoster(s.posterPath)}
                alt={s.title}
              />
            </Col>
            <Col className="movie-info">
              <h1 className="display-3 page-title">{s.title}</h1>
              <h5>{s.releaseYear} • {s.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))} • {s.runtime}</h5>
              <p className="lead"><small><em>{s.tagline}</em></small></p>
              <h6>Overview</h6>
              <p>{s.overview}</p>
              <p><strong>Directed by: </strong>{s.director}</p>
              <p><strong>Starring: </strong>{s.cast.map(actor => (
                <span key={actor.id}>{actor.name}</span>
              ))}</p>
              <p hidden={this.hideOriginalTitle()}>Original title: "{s.originalTitle}"</p>
              <p className="my-canal-button" hidden={this.hideCanalButton()}>
                <a className="my-canal-link" href={this.state.canalUrl}>See on 
                  <img className="mycanal-logo" src="https://static.canal-plus.net/resources/mycanal/mycanal-logo.svg" alt="myCANAL logo"/>
                </a>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
