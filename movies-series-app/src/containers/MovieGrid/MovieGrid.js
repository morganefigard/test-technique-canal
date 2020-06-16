import './MovieGrid.css';
import React, { Component } from 'react';
import Preview from '../../components/Preview/Preview';
import { Row } from 'reactstrap';

export default class MovieGrid extends Component {
  render() {
    return (
      <Row>
        {this.props.movies.map(movie => (
        <Preview 
          title={movie.title}
          rating={movie.vote_average}
          poster={movie.poster_path}
        />
        ))}
      </Row>
    );
  }
}
