import './Preview.css';
import React, { Component } from 'react';
import { 
  Col, 
  Card, 
  CardImg, 
  CardBody, 
  CardText, 
  CardTitle,
  Badge,
} from 'reactstrap';


export default class Preview extends Component {

  getMoviePoster = (posterPath) => {
    if (posterPath) {
      return "http://image.tmdb.org/t/p/w500/" + posterPath;
    } else {
      return "https://via.placeholder.com/500x750.jpg?text=No+poster";
    }
  }

  render() {
    return (
      <Col xl="2" lg="3" md="3" sm="6">
        <Card>
          <CardImg top width="100%" src={this.getMoviePoster(this.props.poster)} alt={this.props.title} />
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>
              <Badge><span role="img" aria-label="star">⭐</span> {this.props.rating}</Badge>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
