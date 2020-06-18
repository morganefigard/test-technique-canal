import './SeriesSearchResults.css';
import React, { Component } from 'react';
import { 
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SeriesSearchResults extends Component {
  getSeriesPoster = (posterPath) => {
    if (posterPath) {
      return "http://image.tmdb.org/t/p/w92" + posterPath;
    } else {
      return "https://via.placeholder.com/92x138.jpg?text=No+poster";
    }
  }

  getSeriesNameWithYear = (series) => {
    if (series.first_air_date) {
      return series.name + " (" + series.first_air_date.substring(0, 4) + ")";
    } else {
      return series.name;
    }
  }
  
  render() {
    return (
      <ListGroup className="search-results text-left">
        {this.props.results.map(series => (
          <ListGroupItem
            key={series.id}
            tag={Link} to={"/series-detail/" + series.id}
          >
            <Row>
              <Col xl="1" md="1" sm="1">
                <img 
                  className="search-result-img"
                  width="100%"
                  src={this.getSeriesPoster(series.poster_path)}
                  alt={series.name}
                />
              </Col>
              <Col xl="11" md="11" sm="11">
                <Row className="search-result-title">
                  <span>{this.getSeriesNameWithYear(series)}</span>
                </Row>
                <Row>
                  <Badge><span role="img" aria-label="star">⭐</span> {series.vote_average}</Badge>
                </Row>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
}
