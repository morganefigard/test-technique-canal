import './MoviePage.css';
import React, { Component } from 'react';
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import { Row, Col } from 'reactstrap';

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state  = {
      movies : [],
      currentPage : 1,
      totalPages : 0
    }
  }

  buildRequestUrl = () => {
    let url = 
      this.props.match.params.page ?
      "https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=title.asc&vote_count.gte=2000&include_adult=false&page=" + this.props.match.params.page
      : "https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=title.asc&vote_count.gte=2000&include_adult=false&page=1"

      return url;
  }

  setStateWithData = (data) => {
    this.setState(() => ({
      movies : [],
      currentPage : data.page,
      totalPages : data.total_pages
    }));

    for (let i=0; i<data.results.length; i++) {
      this.setState(prevState => ({
        movies: [
          ...prevState.movies, 
          {
            "id": data.results[i].id,
            "title": data.results[i].title,
            "vote_average": data.results[i].vote_average,
            "poster_path": data.results[i].poster_path
          }
        ]
      }))
    }
  }

  componentDidMount() {      
    axios.get(this.buildRequestUrl())
      .then(({ data }) => {
        this.setStateWithData(data);
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.page !== prevProps.match.params.page) {
      axios.get(this.buildRequestUrl())
        .then(({ data }) => {
          this.setStateWithData(data);
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-left">Popular movies</h1>
        <MovieGrid
          movies={this.state.movies}
        />
        <Row>
          <Col xl="12" lg="12" md="12" sm="12">
            <PaginationBar
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
