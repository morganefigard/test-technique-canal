import './MovieSearchResults.css';
import React from 'react';
import { 
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Movie } from '../../interfaces/Movies';


interface MovieSearchResultsProps {
  results: Movie[]
}

export default class MovieSearchResults extends React.Component<MovieSearchResultsProps> {

  getMoviePoster = (posterPath: string) => {
    if (posterPath) {
      return "http://image.tmdb.org/t/p/w92" + posterPath;
    } else {
      return "https://via.placeholder.com/92x138.jpg?text=No+poster";
    }
  }

  getMovieTitleWithYear = (movie: Movie) => {
    if (movie.release_date) {
      return movie.title + " (" + movie.release_date.substring(0, 4) + ")";
    } else {
      return movie.title;
    }
  }

  render() {
    return (
      <ListGroup className="search-results text-left">
        {this.props.results.map(movie => (
          <ListGroupItem
            key={movie.id}
            tag={Link} to={"/movie-detail/" + movie.id}
          >
            <Row>
              <Col xl="1" md="1" sm="1">
                <img 
                  className="search-result-img"
                  width="100%"
                  src={this.getMoviePoster(movie.poster_path)}
                  alt={movie.title}
                />
              </Col>
              <Col xl="11" md="11" sm="11">
                <Row className="search-result-title">
                  <span>{this.getMovieTitleWithYear(movie)}</span>
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
