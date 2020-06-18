import './SeriesPage.css';
import React, { Component } from 'react';
import axios from 'axios';
import SeriesGrid from '../SeriesGrid/SeriesGrid';
import { Row, Col } from 'reactstrap';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import SeriesSearch from '../SeriesSearch/SeriesSearch';

export default class SeriesPage extends Component {
  constructor() {
    super();

    this.state  = {
      series : [],
      currentPage : 1,
      totalPages : 0
    }
  }

  buildRequestUrl = () => {
    let url = 
      this.props.match.params.page ?
      "https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&include_null_first_air_dates=false&vote_count.gte=300&sort_by=name.asc&page=" + this.props.match.params.page
      : "https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&include_null_first_air_dates=false&vote_count.gte=300&sort_by=name.asc&page=1"

      return url;
  }

  setStateWithData = (data) => {
    this.setState(() => ({
      series : [],
      currentPage : data.page,
      totalPages : data.total_pages
    }));

    for (let i=0; i<data.results.length; i++) {
      this.setState(prevState => ({
        series: [
          ...prevState.series, 
          {
            "id": data.results[i].id,
            "name": data.results[i].name,
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
        <h1 className="text-left">Popular series</h1>
        <SeriesSearch />
        <SeriesGrid
          series={this.state.series}
        />
        <Row>
          <Col xl="12" lg="12" md="12" sm="12">
            <PaginationBar
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              baseLink="/series/"
            />
          </Col>
        </Row>
      </div>
    )
  }
}
