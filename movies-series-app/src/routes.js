import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Component} from 'react';
import MoviePage from './containers/MoviePage/MoviePage';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MoviePage} />
        <Route exact path="/movies" component={MoviePage} />
        <Route path="/movies/:page" component={MoviePage} />
      </Switch>
    )
  }
}