import './SeriesGrid.css';
import React from 'react';
import Preview from '../../components/Preview/Preview';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { series: state.seriesPage.series };
};

const ConnectedSeriesGrid = ({ series }) => (
  <Row>
    {series.map(series => (
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
)

const SeriesGrid = connect(mapStateToProps)(ConnectedSeriesGrid);

export default SeriesGrid;
