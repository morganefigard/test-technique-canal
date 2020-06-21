import './MovieGrid.css';
import React from 'react';
import Preview from '../../components/Preview/Preview';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Movie } from '../../interfaces/Movies';

interface MovieGridProps {
  movies: Movie[]
}

interface State {
  moviePage: {
    movies: Movie[]
  }
}

const mapStateToProps = (state: State) => {
  return { movies: state.moviePage.movies };
};

const ConnectedMovieGrid = (props: MovieGridProps) => (
  <Row>
    {props.movies.map(movie => (
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
