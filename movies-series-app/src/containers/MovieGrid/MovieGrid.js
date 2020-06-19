import './MovieGrid.css';
import React from 'react';
import Preview from '../../components/Preview/Preview';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { movies: state.moviePage.movies };
};

const ConnectedMovieGrid = ({ movies }) => (
  <Row>
    {movies.map(movie => (
    <Preview 
      key={movie.id}
      id={movie.id}
      title={movie.title}
      rating={movie.vote_average}
      poster={movie.poster_path}
      type="movie"
    />
    ))}
  </Row>
);

const MovieGrid = connect(mapStateToProps)(ConnectedMovieGrid);

export default MovieGrid;
