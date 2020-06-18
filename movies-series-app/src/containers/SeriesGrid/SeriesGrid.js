import './SeriesGrid.css';
import React, { Component } from 'react';
import Preview from '../../components/Preview/Preview';
import { Row } from 'reactstrap';

export default class SeriesGrid extends Component {
  render() {
    return (
      <div>
        <Row>
          {this.props.series.map(series => (
          <Preview 
            key={series.id}
            id={series.id}
            title={series.name}
            rating={series.vote_average}
            poster={series.poster_path}
            type="series"
          />
          ))}
        </Row>
      </div>
    )
  }
}
