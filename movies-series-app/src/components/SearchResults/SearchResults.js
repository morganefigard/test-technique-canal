import './SearchResults.css';
import React, { Component } from 'react';
import { 
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
} from 'reactstrap';


export default class SearchResults extends Component {
  render() {
    return (
      <ListGroup className="search-results text-left">
        {this.props.results.map(movie => (
          <ListGroupItem
            key={movie.id}
          >
            <Row>
              <Col xl="1" md="1" sm="1">
                <img className="search-result-img" width="100%" src={"http://image.tmdb.org/t/p/w92/" + movie.poster_path} alt={movie.title}/>
              </Col>
              <Col xl="11" md="11" sm="11">
                <Row className="search-result-title">
                  <span>{movie.title + " (" + movie.release_date.substring(0, 4) + ")"}</span>
                </Row>
                <Row>
                  <Badge><span role="img" aria-label="star">⭐</span> {movie.vote_average}</Badge>
                </Row>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }
}
