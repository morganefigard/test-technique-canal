import './SeriesPage.css';
import React, { Component } from 'react';
import axios from 'axios';
import SeriesGrid from '../SeriesGrid/SeriesGrid';
import { Row, Col } from 'reactstrap';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import SeriesSearch from '../SeriesSearch/SeriesSearch';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { fillSeries, setCurrentPage, setTotalPages, setBasePath } from '../../store/actions';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    fillSeries: movies => dispatch(fillSeries(movies)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    setTotalPages: pages => dispatch(setTotalPages(pages)),
    setBasePath: path => dispatch(setBasePath(path))
  };
}

class ConnectedSeriesPage extends Component {
  constructor() {
    super();

    this.state  = {
      series: [],
      currentPage: 1,
      totalPages: 0,
      basePath: "/series/"
    }
  }

  buildRequestUrl = () => {
    let url = "https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&include_null_first_air_dates=false&vote_count.gte=300&sort_by=name.asc&page=";

    let page = this.props.match.params.page ? this.props.match.params.page : 1;
    
    url += page;

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

    const { series } = this.state;
    const { currentPage } = this.state;
    const { totalPages } = this.state;
    const { basePath } = this.state;

    this.props.fillSeries({ series });
    this.props.setCurrentPage({ currentPage });
    this.props.setTotalPages({ totalPages });
    this.props.setBasePath({ basePath });

    this.setState({ series: [] });
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
        <NavigationBar />
        <div className="page">
          <h1 className="text-left display-3 page-title">Popular series</h1>
          <SeriesSearch />
          <SeriesGrid />
          <PaginationBar />
        </div>
      </div>
    )
  }
}

const SeriesPage = connect(
  null,
  mapDispatchToProps
)(ConnectedSeriesPage);

export default SeriesPage;
