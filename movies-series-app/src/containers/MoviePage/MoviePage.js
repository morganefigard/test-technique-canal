import './MoviePage.css';
import React, { Component } from 'react';
import axios from 'axios';
import MovieGrid from '../MovieGrid/MovieGrid';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import MovieSearch from '../MovieSearch/MovieSearch';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import { fillMovies, setCurrentPage, setTotalPages, setBasePath } from '../../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    fillMovies: movies => dispatch(fillMovies(movies)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    setTotalPages: pages => dispatch(setTotalPages(pages)),
    setBasePath: path => dispatch(setBasePath(path))
  };
}

class ConnectedMoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      currentPage: 1,
      totalPages: 0,
      basePath: "/movies/"
    };
  }

  buildRequestUrl = () => {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=92b418e837b833be308bbfb1fb2aca1e&language=en-US&sort_by=title.asc&vote_count.gte=2000&include_adult=false&page=";

    let page = this.props.match.params.page ? this.props.match.params.page : 1;
    
    url += page;

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

    const { movies } = this.state;
    const { currentPage } = this.state;
    const { totalPages } = this.state;
    const { basePath } = this.state;

    this.props.fillMovies({ movies });
    this.props.setCurrentPage({ currentPage });
    this.props.setTotalPages({ totalPages });
    this.props.setBasePath({ basePath });

    this.setState({ movies: [] });
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
          <h1 className="text-left display-3 page-title">Popular movies</h1>
          <MovieSearch />
          <MovieGrid />
          <PaginationBar />
        </div>
      </div>
    )
  }
}

const MoviePage = connect(
  null,
  mapDispatchToProps
)(ConnectedMoviePage);

export default MoviePage;
