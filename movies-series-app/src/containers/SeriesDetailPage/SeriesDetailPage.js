import './SeriesDetailPage.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { Observable, from, Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export default class SeriesDetailPage extends Component {
  constructor() {
    super();

    this.state  = {
      canalUrl : "",
      cast : [],
      creators : [],
      episodeRuntime : "",
      firstAirYear : "",
      frenchTitleProps : "",
      frenchTitle : "",
      genres : [],
      name : "",
      originalName : "",
      overview : "",
      posterPath : "",
      voteAverage : 0
    }

    this.allInfos$ = new Observable();
    this.allInfosSub = new Subscription();
  }

  buildDetailUrl = (seriesId) => {
    let url = 
      "https://api.themoviedb.org/3/tv/"
      + seriesId 
      + "?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US";
    
    return url;
  }

  buildPeopleUrl = (seriesId) => {
    let url = 
      "https://api.themoviedb.org/3/tv/"
      + seriesId 
      + "/credits?api_key=92b418e837b833be308bbfb1fb2aca1e";
    
    return url;
  }

  buildAltTitleUrl = (seriesId) => {
    let url = 
      "https://api.themoviedb.org/3/tv/"
      + seriesId 
      + "/alternative_titles?api_key=92b418e837b833be308bbfb1fb2aca1e";
    
    return url;
  }

  buildSearchUrl = (name) => {
    let url =
      "https://hodor.canalplus.pro/api/v2/mycanal/search/mycanal_channel_discover/800c32b7f357adeac52ffd0523fb2b93/query/"
      + name
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

  getCreator = (creators) => {
    let creatorsNameId = [];

    creators.map(creator => {
      creatorsNameId.push({
        "name" : creator.name,
        "id" : creator.id
      });
    });
    
    return this.prettifyList(creatorsNameId);
  }

  getfirstAirYear = (firstAirDate) => {
    if (firstAirDate) {
      return firstAirDate.substring(0, 4);
    }
    else return "";
  }
   
  getSeriesPoster = (posterPath) => {
    if (posterPath) {
      return "http://image.tmdb.org/t/p/w780" + posterPath;
    } else {
      return "https://via.placeholder.com/780x1170.jpg?text=No+poster";
    }
  }

  parseToURI = (string) => {
    return encodeURI(string.normalize("NFD").replace(/[\u0300-\u036f]|[\u002e]/g, "").replace(/[\u002d]|[\u0028]|[\u0029]|[\u002c]/g, " ").toLowerCase());
  }

  hideOriginalName = () => {
    return this.state.originalName === this.state.name;
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
          creators : this.getCreator(infos.data.created_by),
          genres : this.prettifyList(infos.data.genres),
          originalName : infos.data.original_name,
          overview : infos.data.overview,
          posterPath : infos.data.poster_path,
          firstAirYear : this.getfirstAirYear(infos.data.first_air_date),
          episodeRuntime : infos.data.episode_run_time,
          name : infos.data.name,
          voteAverage : infos.data.vote_average,
          cast : this.prettifyCast(people.data.cast),
          frenchTitleProps : altTitle.data.results.find(title => title.iso_3166_1 === "FR"),
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
          from(axios.get(this.buildSearchUrl(this.state.name))),
          from(axios.get(this.buildSearchUrl(this.state.originalName))),
          from(axios.get(this.buildSearchUrl(this.state.frenchTitle))),
        );
      })
    )
    .subscribe(([ hsrTitle, hsrOrigTitle, hsrFrTitle ]) => {
      const searchResults = hsrTitle.data.contents.concat(hsrOrigTitle.data.contents).concat(hsrFrTitle.data.contents);

      for (let i=0; i<searchResults.length; i++) {
        if (
          this.parseToURI(searchResults[i].title) === this.parseToURI(this.state.name)
          || this.parseToURI(searchResults[i].title) === this.parseToURI(this.state.originalName)
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
                src={this.getSeriesPoster(s.posterPath)}
                alt={s.name}
              />
            </Col>
            <Col className="movie-info">
              <h1 className="display-3 page-title">{s.name}</h1>
              <h5>{s.firstAirYear} • {s.genres.map(genre => (
                  <span key={genre.id}>{genre.name} </span>
                ))} • {s.episodeRuntime}m</h5>
              <h6>Overview</h6>
              <p>{s.overview}</p>
              <p><strong>Created by: </strong>{s.creators.map(creator => (
                <span key={creator.id}>{creator.name} </span>
              ))}</p>
              <p><strong>Starring: </strong>{s.cast.map(actor => (
                <span key={actor.id}>{actor.name}</span>
              ))}</p>
              <p hidden={this.hideOriginalName()}><small>Original name: "{s.originalName}"</small></p>
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
